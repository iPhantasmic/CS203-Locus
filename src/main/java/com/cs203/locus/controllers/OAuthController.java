package com.cs203.locus.controllers;

import com.cs203.locus.security.FacebookService;
import com.cs203.locus.security.GoogleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;


@RestController
public class OAuthController {

    @Autowired
    private FacebookService facebookService;
    @Autowired
    private GoogleService googleService;

    @PostMapping("/facebook/signin")
    public ResponseEntity<?> facebookAuth(@RequestParam(name = "token") String facebookAccessToken, HttpServletResponse res) {
        Object[] tokenDetails = facebookService.loginUser(facebookAccessToken);
        ResponseCookie resCookie = ResponseCookie.from("token", tokenDetails[1].toString())
                .httpOnly(true)
                // Uncomment this when pushing into production
//                .secure(true)
                .path("/")
                .maxAge(60 * 60 * 5)
                .build();
        res.addHeader("Set-Cookie", resCookie.toString());
        return ResponseEntity.ok(tokenDetails[0]);
    }

    @PostMapping("/google/signin")
    public ResponseEntity<?> googleAuth(@RequestParam(name = "token") String googleAccessToken, HttpServletResponse res) {
        Object[] tokenDetails = googleService.loginUser(googleAccessToken);
        ResponseCookie resCookie = ResponseCookie.from("token", tokenDetails[1].toString())
                .httpOnly(true)
//                .secure(true)
                .path("/")
                .maxAge(60 * 60 * 5)
                .build();
        res.addHeader("Set-Cookie", resCookie.toString());
        return ResponseEntity.ok(tokenDetails[0]);
    }
}
