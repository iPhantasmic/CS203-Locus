package com.cs203.locus.controllers;

import com.cs203.locus.models.security.JwtResponse;
import com.cs203.locus.security.FacebookService;
import com.cs203.locus.security.GoogleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class OAuthController {

    @Autowired
    private FacebookService facebookService;
    @Autowired
    private GoogleService googleService;

    @PostMapping("/facebook/signin")
    public ResponseEntity<?> facebookAuth(@RequestBody String facebookAccessToken) {
        JwtResponse jwtResponse = facebookService.loginUser(facebookAccessToken);

        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/google/signin")
    public ResponseEntity<?> googleAuth(@RequestBody String googleAccessToken) {
        JwtResponse jwtResponse = googleService.loginUser(googleAccessToken);

        return ResponseEntity.ok(jwtResponse);
    }
}
