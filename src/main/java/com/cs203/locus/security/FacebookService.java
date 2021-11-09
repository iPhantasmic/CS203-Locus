package com.cs203.locus.security;

import com.cs203.locus.models.organiser.Organiser;
import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.security.FacebookUser;
import com.cs203.locus.models.security.JwtResponse;
import com.cs203.locus.models.user.User;
import com.cs203.locus.models.user.UserDTO;
import com.cs203.locus.repository.UserRepository;
import com.cs203.locus.service.OrganiserService;
import com.cs203.locus.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Random;

@Service
public class FacebookService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FacebookClient facebookClient;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    @Autowired
    private ParticipantService participantService;
    @Autowired
    private OrganiserService organiserService;

    public Object[] loginUser(String fbAccessToken) {
        FacebookUser facebookUser = facebookClient.getUser(fbAccessToken);

        User toLogin = null;
        if (userRepository.findByEmail(facebookUser.getEmail()) == null) {
            toLogin = createNormalUser(facebookUser);
        } else {
            toLogin = userRepository.findByEmail(facebookUser.getEmail());
        }

        final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(toLogin.getUsername());
        final String token = jwtTokenUtil.generateAuthToken(userDetails);

        // returns JSON object containing username, email and JWT token of logged in Google user
        return new Object[]{new JwtResponse(toLogin.getId(), toLogin.getName(), toLogin.getUsername(), token),token};
    }

    private User createNormalUser(FacebookUser facebookUser) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(generateUsername(facebookUser.getFirstName(), facebookUser.getLastName()));
        userDTO.setPassword(generatePassword(16));
        userDTO.setEmail(facebookUser.getEmail());
        userDTO.setName(facebookUser.getFirstName());
        userDTO.setConfirmPassword(userDTO.getPassword());
        User newUser = jwtUserDetailsService.create(userDTO);
//        newUser.setRole("ROLE_FACEBOOK_USER"); TODO: test if this is necessary

        Participant newParticipant = new Participant();
        newParticipant.setId(newUser.getId());
        newParticipant.setVaxStatus(false);
        newParticipant.setUser(newUser);
        newParticipant.setEventTicket(new ArrayList<>());
        participantService.createParticipant(newParticipant);

        Organiser newOrganiser = new Organiser();
        newOrganiser.setId(newUser.getId());
        newOrganiser.setUser(newUser);
        newOrganiser.setEvents(new ArrayList<>());
        organiserService.createOrganiser(newOrganiser);

        return newUser;
    }

    private String generateUsername(String firstName, String lastName) {
        Random rnd = new Random();
        int number = rnd.nextInt(999999);
        return String.format("%s.%s.%06d", firstName, lastName, number);
    }

    private String generatePassword(int length) {
        String capitalCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
        String specialCharacters = "!@#$";
        String numbers = "1234567890";
        String combinedChars = capitalCaseLetters + lowerCaseLetters + specialCharacters + numbers;
        Random random = new Random();
        char[] password = new char[length];

        password[0] = lowerCaseLetters.charAt(random.nextInt(lowerCaseLetters.length()));
        password[1] = capitalCaseLetters.charAt(random.nextInt(capitalCaseLetters.length()));
        password[2] = specialCharacters.charAt(random.nextInt(specialCharacters.length()));
        password[3] = numbers.charAt(random.nextInt(numbers.length()));

        for(int i = 4; i< length ; i++) {
            password[i] = combinedChars.charAt(random.nextInt(combinedChars.length()));
        }
        return new String(password);
    }
}
