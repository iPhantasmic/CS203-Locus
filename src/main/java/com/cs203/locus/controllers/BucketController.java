package com.cs203.locus.controllers;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.repository.UserRepository;
import com.cs203.locus.util.BucketUtil;
import com.cs203.locus.util.DetectSafeSearchUtil;
import com.cs203.locus.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin
public class BucketController {

    @Autowired
    BucketUtil bucketUtil;

//    @Autowired
//    DetectSafeSearchUtil detectSafeSearch;

    @Autowired
    ParticipantService participantService;

    @Autowired
    UserRepository users;

    @PostMapping(path = "/gcs/upload/vacc", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public @ResponseBody ResponseEntity<?> uploadFile(@RequestPart(value = "file", required = true) MultipartFile file) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            // TODO: Check for Magic Mushrooms before upload
        try {
            if (true) {
                Participant updatedParticipant = bucketUtil.uploadObject(file, users.findByUsername(auth.getName()).getId());
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
