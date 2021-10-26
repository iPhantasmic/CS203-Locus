package com.cs203.locus.controllers;

import com.cs203.locus.models.user.User;
import com.cs203.locus.models.user.UserReturnDTO;
import com.cs203.locus.models.user.UserUpdateDTO;
import com.cs203.locus.util.EmailUtilService;
import com.cs203.locus.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/user")

public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private EmailUtilService emailUtilService;

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    // User authentication APIs can be found under JwtAuthController

    // Get user by username
    @GetMapping(value = "/{username}")
    @PreAuthorize("hasRole('ADMIN') or #username == authentication.name")
    public @ResponseBody
    ResponseEntity<UserReturnDTO> getUser(@PathVariable String username) {
        User user = userService.findByUsername(username);
        // Only occurs if user is deleted and attempts to use his token to access the deleted account
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No user with username: " + username);
        }

        UserReturnDTO userReturnDTO = new UserReturnDTO();
        userReturnDTO.setUsername(user.getUsername());
        userReturnDTO.setName(user.getName());
        userReturnDTO.setEmail(user.getEmail());
        userReturnDTO.setEmailVerified(user.getEmailVerified());

        return ResponseEntity.ok(userReturnDTO);
    }

    // Update Username, DisplayName, Email
    @PostMapping(path = "/{username}")
    @PreAuthorize("hasRole('ADMIN') or #username == authentication.name")
    public @ResponseBody
    ResponseEntity<UserReturnDTO> update(@PathVariable String username, @Valid @RequestBody UserUpdateDTO userDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMsg = new StringBuilder("Invalid ");
            for (ObjectError error : bindingResult.getAllErrors()) {
                String fieldError = ((FieldError) error).getField();
                if ("username".equals(fieldError)) {
                    errorMsg.append(" username ");
                } else if ("name".equals(fieldError)) {
                    errorMsg.append(" name ");
                } else if ("email".equals(fieldError)) {
                    errorMsg.append(" email ");
                }
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMsg.toString());
        }

        boolean userOK = true;
        // If username does not match RequestBody, check database for new username. If not null, username is in use!
        if (!userDTO.getUsername().equals(username) && userService.findByUsername(userDTO.getUsername()) != null) {
            userOK = false;
        }

        boolean emailOK = true;
        // If user found for given email, check that username matches, otherwise, new email provided is in use!
        User checkEmail = userService.findByEmail(userDTO.getEmail());
        if (checkEmail != null && !checkEmail.getUsername().equals(username)) {
            emailOK = false;
        }

        if (!userOK && !emailOK) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Username and email already exists!");
        } else if (userOK && !emailOK) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Email already exists!");
        } else if (!userOK) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Username already exists!");
        }

        User u = userService.findByUsername(username);
        u.setUsername(userDTO.getUsername());
        u.setName(userDTO.getName());
        // If user changes email, we need to set email to unverified
        if (!u.getEmail().equals(userDTO.getEmail())) {
            u.setEmailVerified(false);
        }
        u.setEmail(userDTO.getEmail());

        try {
            User user = userService.update(u);

            UserReturnDTO userReturnDTO = new UserReturnDTO();
            userReturnDTO.setUsername(user.getUsername());
            userReturnDTO.setName(user.getName());
            userReturnDTO.setEmail(user.getEmail());
            userReturnDTO.setEmailVerified(user.getEmailVerified());

            return ResponseEntity.ok(userReturnDTO);
        } catch(DataIntegrityViolationException ex) {
            // Any duplicate username/email database constraint error not caught by check above
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Username/email already exists!");
        } catch (Exception ex) {
            LOGGER.error(ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unknown error occurs, please try again!");
        }
    }

    // Delete user
    @DeleteMapping(value = "/{username}")
//    @PreAuthorize("hasRole('ADMIN') or #username == authentication.name")
    public @ResponseBody
    ResponseEntity<?> delete(@PathVariable String username) {
        User toDel = userService.findByUsername(username);
        if (toDel == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No user with username: " + username);
        }

        userService.delete(toDel);

//        if (toDel.getEmailVerified()) {
//            try {
//                sendDeletionEmail(toDel.getEmail(), toDel.getName());
//            } catch (Exception ex) {
//                LOGGER.error(ex.getMessage());
//            }
//        }

        return ResponseEntity.ok(username + " has been deleted.");
    }

//    @Async
//    private void sendDeletionEmail(String mailTo, String name) throws IOException, MessagingException {
//        String request = "We have sent you this email in response to your request to delete your registered account.";
//        String response = "We would like to inform you that your account deletion is successful.";
//        Email mail = new Email();
//        mail.setMailTo(mailTo);//replace with your desired email
//        mail.setFrom(fromEmail);
//        mail.setSubject("Account Deletion");
//        Map<String, Object> model = new HashMap<String, Object>();
//        model.put("name", name);
//        model.put("request", request);
//        model.put("response", response);
//        mail.setProps(model);
//        emailUtil.sendEmailWithTemplate(mail, "alert-email-template");
//    }

    // Forget username (feature not available on frontend)
    @PostMapping(value = "/forget")
    public @ResponseBody
    ResponseEntity<?> getUsername(@RequestParam String email) {
        User user = userService.findByEmail(email);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid email provided!");
        }

        if (!user.getEmailVerified()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Email not confirmed!");
        }

//        try {
//            String username = user.getUsername();
//            sendUserEmail(email, username, user.getUsername());
//        } catch (Exception ex) {
//            LOGGER.error(ex.getMessage());
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
//                    "Unknown error occurs, please try again!");
//        }

        return ResponseEntity.ok("Username has been sent to " + user.getEmail() + ".");
    }

//    private void sendUserEmail(String mailTo, String text, String name) throws IOException, MessagingException {
//        String request = "We have sent you this email in response to your forgotten username.";
//        String response = "Your username is: " + text;
//        Email mail = new Email();
//        mail.setFrom(fromEmail); // to be changed to default email
//        mail.setMailTo(mailTo);
//        mail.setSubject("Forgot Username");
//        Map<String, Object> model = new HashMap<String, Object>();
//        model.put("name", name);
//        model.put("request", request);
//        model.put("response", response);
//        mail.setProps(model);
//        emailUtil.sendEmailWithTemplate(mail, "alert-email-template");
//    }
}


