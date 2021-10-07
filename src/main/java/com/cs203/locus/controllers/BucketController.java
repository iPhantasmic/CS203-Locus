package com.cs203.locus.controllers;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.user.User;
import com.cs203.locus.repository.ParticipantRepository;
import com.cs203.locus.repository.UserRepository;
import com.cs203.locus.service.BucketService;
import com.cs203.locus.service.DetectSafeSearch;
import com.cs203.locus.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@CrossOrigin
public class BucketController {

    @Autowired
    BucketService bucketService;

    @Autowired
    DetectSafeSearch detectSafeSearch;

    @Autowired
    ParticipantService participantService;

    @Autowired
    UserRepository users;

    @PostMapping(path = "/gcs/upload/vacc", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public @ResponseBody ResponseEntity<?> uploadFile(@RequestPart(value = "file", required = true) MultipartFile file) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            // TODO: Check for Magic Mushrooms before upload
        try {
            if (detectSafeSearch.detect(file)) {
                Participant updatedParticipant = bucketService.uploadObject(file, users.findByUsername(auth.getName()).getId());
                return updatedParticipant == null ? ResponseEntity.status(414).body("Image denied, file size too big") : ResponseEntity.ok(updatedParticipant);
            } else {
                return ResponseEntity.badRequest().body("Image denied, please try again with another photo.");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Upload error, please try again.");
        }

    }
}
