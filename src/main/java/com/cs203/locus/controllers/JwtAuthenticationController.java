package com.cs203.locus.controllers;

import com.cs203.locus.models.security.JwtRequest;
import com.cs203.locus.models.security.JwtResponse;
import com.cs203.locus.models.security.ResetPassword;
import com.cs203.locus.models.user.User;
import com.cs203.locus.models.user.UserDTO;
import com.cs203.locus.security.JwtTokenUtil;
import com.cs203.locus.security.JwtUserDetailsService;
import com.cs203.locus.service.UserService;
import com.cs203.locus.util.EmailUtilService;
import freemarker.template.TemplateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private JwtUserDetailsService userDetailsService;
    @Autowired
    private EmailUtilService emailUtilService;
    @Autowired
    private UserService userService;

    @Value("${jwt.email.url}")
    private String url;

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationController.class);

    // Takes in username and password for login, returns a JWT token
    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest, HttpServletResponse res) throws Exception {
        try {
            authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Username/Password invalid!");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateAuthToken(userDetails);

        ResponseCookie resCookie = ResponseCookie.from("token", token)
                .httpOnly(true)
//                .secure(true)
                .path("/")
                .maxAge(60 * 60 * 5)
                .build();
        res.addHeader("Set-Cookie", resCookie.toString());

        final String username = authenticationRequest.getUsername();
        final Integer id = userService.findByUsername(username).getId();
        final String name = userService.findByUsername(username).getName();

        return ResponseEntity.ok(new JwtResponse(id, name, username));

    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        }
    }

    // Takes in a user object and registers user
    @PostMapping(value = "/register")
    public ResponseEntity<?> saveUser(@Valid @RequestBody UserDTO userDTO, BindingResult bindingResult) {
        // Catch fields that failed validation
        if (bindingResult.hasErrors()) {
            StringBuilder errorMsg = new StringBuilder("Invalid ");
            for (ObjectError error : bindingResult.getAllErrors()) {
                String fieldError = ((FieldError) error).getField();
                if ("username".equals(fieldError) || "name".equals(fieldError)) {
                    errorMsg.append(" username/email ");
                } else if ("password".equals(fieldError)) {
                    errorMsg.append(" password ");
                } else if ("email".equals(fieldError)) {
                    errorMsg.append(" email ");
                }
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMsg.toString());
        }

        // Catch password mismatch
        if (!userDTO.getPassword().equals(userDTO.getConfirmPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Password and confirmPassword provided do not match!");
        }

        // Catch duplicate email
        if (userService.findByEmail(userDTO.getEmail()) != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Email already in use!");
        }

        // All ok
        User newUser = null;
        try {
            // Create user
            newUser = userDetailsService.create(userDTO);
            // Email verification
//            sendEmailVerification(newUser);
        } catch (DataIntegrityViolationException ex) {
            // Duplicate username database error
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Username already exists!");
//        } catch (IOException | MessagingException e) {
//            LOGGER.error(e.getMessage());
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unknown error occurs, please try again!");
        }

        return ResponseEntity.ok("User created successfully!");
    }

    // Takes in username and sends out email verification
    @PreAuthorize("#username == authentication.name")
    @PostMapping(value = "/requestemail")
    public ResponseEntity<?> requestEmail(@RequestParam String username) {
        User user = userService.findByUsername(username);
        // Should not occur if JWT/WebSecurity is enabled
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No such user!");
        }
        if (user.getEmailVerified()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Email already confirmed!");
        }

//        try {
//            sendEmailVerification(user);
//        } catch (Exception e) {
//            LOGGER.error(e.getMessage());
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
//                    "Unknown error occurs, please try again!");
//        }

        return ResponseEntity.ok("Email confirmation link has been sent to " + user.getUsername());
    }


    // Takes in JWT and authenticates it to confirm user's email
    @PostMapping(value = "/confirmemail")
    public ResponseEntity<?> confirmEmail(@RequestParam String token) {
        if (!validate(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Invalid email confirmation token!");
        }

        String username = jwtTokenUtil.getUsernameFromTokenUnsecure(token);

        if (userService.findByUsername(username).getEmailVerified()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Email already confirmed!");
        }

        // Token valid, proceed to set email to verified
        User updatedUser = userService.findByUsername(username);
        updatedUser.setEmailVerified(true);

        try {
            userService.update(updatedUser);
            return ResponseEntity.ok("Email confirmed successfully!");
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unknown error occurs, please try again!");
        }

    }

    // Takes in email and sends out password reset link
    @PostMapping(value = "/reset")
    public ResponseEntity<?> requestReset(@RequestParam String email) {
        User user = userService.findByEmail(email);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid email provided!");
        }

        if (!user.getEmailVerified()) {
            // would need to find some admin to reset password
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Email not confirmed!");
        }

        final UserDetails userDetails = userDetailsService.loadUserByEmail(email);
        final String token = jwtTokenUtil.generateResetToken(userDetails);

        final String link = url + "/resetpassword?token=" + token;

        Map<String, Object> formModel = new HashMap<>();
        formModel.put("recipientEmailAddress", email);
        formModel.put("userName", user.getName());
        formModel.put("resetPasswordLink", link);

        try {
            emailUtilService.sendResetEmail(formModel);
        } catch (IOException | MessagingException | TemplateException e) {
            LOGGER.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unknown error occurs, please try again!");
        }

        return ResponseEntity.ok("Password reset link has been sent to " + email);
    }

    // Validates password reset token and allows a user to change their password
    @PostMapping(value = "/resetpassword")
    public ResponseEntity<?>
    resetPwd(@RequestParam String token, @Valid @RequestBody ResetPassword resetPassword, BindingResult bindingResult) {
        if (!validate(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Invalid password reset token!");
        }

        final String username = jwtTokenUtil.getUsernameFromTokenUnsecure(token);

        if (bindingResult.hasErrors()) {
            StringBuilder errorMsg = new StringBuilder("Invalid ");
            for (ObjectError error : bindingResult.getAllErrors()) {
                String fieldError = ((FieldError) error).getField();
                if ("password".equals(fieldError)) {
                    errorMsg.append(" password ");
                } else if ("confirmPassword".equals(fieldError)) {
                    errorMsg.append(" confirmPassword ");
                }
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMsg.toString());
        }

        if (!resetPassword.getPassword().equals(resetPassword.getConfirmPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Password and confirmPassword provided do not match!");
        }

        User updatedUser = userService.findByUsername(username);
        // Pass new password to User for userDetailsService to update the user's password
        updatedUser.setPassword(resetPassword.getPassword());

        try {
            userDetailsService.updatePwd(updatedUser);
//            sendAlertEmail(updatedUser.getEmail(), updatedUser.getName());
            return ResponseEntity.ok("Password reset successful.");
        } catch (Exception ex) {
            LOGGER.error(ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unknown error occurs, please try again!");
        }

    }

    // Change password when logged in
    @PostMapping(path = "/password/{username}")
    @PreAuthorize("hasRole('ADMIN') or #username == authentication.name")
    public @ResponseBody
    ResponseEntity<?> update(@PathVariable String username, @Valid @RequestBody ResetPassword resetPassword,
                             BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMsg = new StringBuilder("Invalid ");
            for (ObjectError error : bindingResult.getAllErrors()) {
                String fieldError = ((FieldError) error).getField();
                if ("password".equals(fieldError)) {
                    errorMsg.append(" password ");
                } else if ("confirmPassword".equals(fieldError)) {
                    errorMsg.append(" confirmPassword ");
                }
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMsg.toString());
        }

        if (!resetPassword.getPassword().equals(resetPassword.getConfirmPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Password and confirmPassword provided do not match!");
        }

        User updatedUser = userService.findByUsername(username);
        updatedUser.setPassword(resetPassword.getPassword());

        try {
            userDetailsService.updatePwd(updatedUser);
//            sendAlertEmail(updatedUser.getEmail(), updatedUser.getName());
            return ResponseEntity.ok("Password change successful.");
        } catch (Exception ex) {
            LOGGER.error(ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unknown error occurs, please try again!");
        }
    }


    // For validating token
    @PostMapping(value = "/validate")
    public ResponseEntity<?> validateJWT(@RequestParam String token) {
        if (!validate(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Token invalid!");
        }

        return ResponseEntity.ok("Token valid!");
    }

    private boolean validate(String token) {
        try {
            final String username = jwtTokenUtil.getUsernameFromTokenUnsecure(token);
            final UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            return jwtTokenUtil.validateToken(token, userDetails);
        } catch (BadCredentialsException e) {
            if (e.getMessage().equals("999")) {
                // 999 - Token Expired
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                        "Token Expired!");
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Token Invalid!");
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unknown error occurs, please try again!");
        }
    }
}
