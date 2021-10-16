package com.cs203.locus.controllers;

//import com.cs203.locus.models.email.Email;
import com.cs203.locus.models.security.JwtRequest;
import com.cs203.locus.models.security.JwtResponse;
import com.cs203.locus.models.security.ResetPassword;
import com.cs203.locus.models.user.User;
import com.cs203.locus.models.user.UserDTO;
import com.cs203.locus.repository.UserRepository;
import com.cs203.locus.security.JwtTokenUtil;
import com.cs203.locus.security.JwtUserDetailsService;
import com.cs203.locus.service.OrganiserService;
import com.cs203.locus.service.ParticipantService;
import freemarker.template.TemplateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
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
import com.cs203.locus.util.EmailUtilService;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
    private UserRepository userRepository;
    @Autowired
    private OrganiserService organiserService;
    @Autowired
    private ParticipantService participantService;

//    @Value("${jwt.email.url}")
//    private String url;
//
//    @Value("${spring.mail.username}")
//    private String fromEmail;

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationController.class);

    // Takes in username and password for login, returns a JWT token
    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        try {
            authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Username/Password invalid!");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateAuthToken(userDetails);
        final String username = authenticationRequest.getUsername();
        final Integer id = userRepository.findByUsername(username).getId();
        final String name = userRepository.findByUsername(username).getName();

        return ResponseEntity.ok(new JwtResponse(id, name, token));
        
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
            int errorCode = 900;
            for (ObjectError error : bindingResult.getAllErrors()) {
                String fieldError = ((FieldError) error).getField();
                if ("username".equals(fieldError) || "name".equals(fieldError)) {
                    errorCode += 1;
                } else if ("password".equals(fieldError)) {
                    errorCode += 2;
                } else if ("email".equals(fieldError)) {
                    errorCode += 4;
                }
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    Integer.toString(errorCode));
        }

        // Catch password mismatch
        if (!userDTO.getPassword().equals(userDTO.getConfirmPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Password and confirmPassword provided do not match!");
        }

        // Catch duplicate email
        if (userRepository.findByEmail(userDTO.getEmail()) != null) {
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
        } catch(DataIntegrityViolationException ex) {
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
        User user = userRepository.findByUsername(username);
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

//    private void sendEmailVerification(User user) throws IOException, MessagingException {
//        final String token = jwtTokenUtil.generateEmailToken(user.getUsername());
//        final String link = url + "confirmemail?token=" +  token;
//        final String email = user.getEmail();
//        sendLinkEmail(email, link, user.getUsername(), "Email Verification");
//    }

    // Takes in JWT and authenticates it to confirm user's email
    @PostMapping(value = "/confirmemail")
    public ResponseEntity<?> confirmEmail(@RequestParam String token) {
        if (!validate(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Invalid email confirmation token!");
        }

        String username = jwtTokenUtil.getUsernameFromTokenUnsecure(token);

        if (userRepository.findByUsername(username).getEmailVerified()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Email already confirmed!");
        }

        // Token valid, proceed to set email to verified
        User updatedUser = userRepository.findByUsername(username);
        updatedUser.setEmailVerified(true);

        try {
            userRepository.save(updatedUser);
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
        User user = userRepository.findByEmail(email);
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
        
        // Temp hardcoded url
        String url = "https://locus-zeta.vercel.app";
        final String link = url + "resetpassword?token=" + token;

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

//    @Async
//    private void sendLinkEmail(String mailTo, String text, String name, String subject) throws IOException, MessagingException {
//        Email mail = new Email();
//        mail.setFrom(fromEmail); // to be changed to default email
//        mail.setMailTo(mailTo);
//        mail.setSubject(subject);
//        Map<String, Object> model = new HashMap<>();
//        model.put("name", name);
//        model.put("link", text);
//        mail.setProps(model);
//        if (subject.equals("Password Reset")) {
//            emailUtil.sendEmailWithTemplate(mail, "password-email-template");
//        } else if (subject.equals("Email Verification")) {
//            emailUtil.sendEmailWithTemplate(mail,"email-confirm-template.html");
//        }
//    }

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
            int errorCode = 700;
            for (ObjectError error : bindingResult.getAllErrors()) {
                String fieldError = ((FieldError) error).getField();
                if ("password".equals(fieldError)) {
                    errorCode += 1;
                } else if ("confirmPassword".equals(fieldError)) {
                    errorCode += 2;
                }
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    Integer.toString(errorCode));
        }

        if (!resetPassword.getPassword().equals(resetPassword.getConfirmPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Password and confirmPassword provided do not match!");
        }

        User updatedUser = userRepository.findByUsername(username);
        // Pass new password to User for userDetailsService to update the user's password
        updatedUser.setPassword(resetPassword.getPassword());

//        try {
//            userDetailsService.updatePwd(updatedUser);
//            sendAlertEmail(updatedUser.getEmail(), updatedUser.getName());
            return ResponseEntity.ok("Password reset successful.");
//        } catch (Exception ex) {
//            LOGGER.error(ex.getMessage());
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
//                    "Unknown error occurs, please try again!");
//        }

    }

    // Change password when logged in
    @PostMapping(path = "/password/{username}")
    @PreAuthorize("hasRole('ADMIN') or #username == authentication.name")
    public @ResponseBody
    ResponseEntity<?> update(@PathVariable String username, @Valid @RequestBody ResetPassword resetPassword,
                             BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            int errorCode = 700;
            for (ObjectError error : bindingResult.getAllErrors()) {
                String fieldError = ((FieldError) error).getField();
                if ("password".equals(fieldError)) {
                    errorCode += 1;
                } else if ("confirmPassword".equals(fieldError)) {
                    errorCode += 2;
                }
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    Integer.toString(errorCode));
        }

        if (!resetPassword.getPassword().equals(resetPassword.getConfirmPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Password and confirmPassword provided do not match!");
        }

        User updatedUser = userRepository.findByUsername(username);
        updatedUser.setPassword(resetPassword.getPassword());

//        try {
//            userDetailsService.updatePwd(updatedUser);
//            sendAlertEmail(updatedUser.getEmail(), updatedUser.getName());
            return ResponseEntity.ok("Password change successful.");
//        } catch (Exception ex) {
//            LOGGER.error(ex.getMessage());
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
//                    "Unknown error occurs, please try again!");
//        }
    }

//    @Async
//    private void sendAlertEmail(String mailTo, String name) throws IOException, MessagingException {
//        String request = "We have sent you this email in response to your request to reset your password.";
//        String response = "We would like to inform you that your password change is successful.";
//        Email mail = new Email();
//        mail.setMailTo(mailTo);//replace with your desired email
//        mail.setFrom(fromEmail);
//        mail.setSubject("Password Change Successful");
//        Map<String, Object> model = new HashMap<String, Object>();
//        model.put("name", name);
//        model.put("request", request);
//        model.put("response", response);
//        mail.setProps(model);
//        emailUtil.sendEmailWithTemplate(mail, "alert-email-template");
//    }

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
                        "999");
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Token invalid!");
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unknown error occurs, please try again!");
        }
    }
}
