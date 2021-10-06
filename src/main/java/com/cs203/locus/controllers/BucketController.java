package com.cs203.locus.controllers;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.user.User;
import com.cs203.locus.repository.ParticipantRepository;
import com.cs203.locus.repository.UserRepository;
import com.cs203.locus.service.BucketService;
import com.cs203.locus.service.DetectSafeSearch;
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
    ParticipantRepository participants;

    @Autowired
    UserRepository users;

    @PostMapping(path = "/gcs/upload/vacc", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public @ResponseBody ResponseEntity<String> uploadFile(@RequestPart(value = "file", required = true) MultipartFile file) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        try {
            // TODO: Check for Magic Mushrooms before upload
            if (detectSafeSearch.detect(file)) {
                String url = bucketService.uploadObject(file);

                User user = users.findByUsername(auth.getName());
                Optional<Participant> participant = participants.findById(user.getId());
                Participant participant1 = participant.orElse(null);
                assert participant1 != null;
                participant1.setVaxGcsUrl(url);
                participants.save(participant1);
            } else {
                return ResponseEntity.badRequest().body("Please try again with another photo.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok("Image uploaded successfully.");
    }
}
