package com.cs203.locus.controllers;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.repository.UserRepository;
import com.cs203.locus.util.BucketUtil;
import com.cs203.locus.service.ParticipantService;
import com.cs203.locus.util.DetectSafeSearchUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@RestController
@CrossOrigin
public class BucketController {

    @Autowired
    BucketUtil bucketUtil;
    @Autowired
    DetectSafeSearchUtil detectSafeSearch;
    @Autowired
    ParticipantService participantService;
    @Autowired
    UserRepository users;

    private static final Logger LOGGER = LoggerFactory.getLogger(BucketController.class);


    @PostMapping(path = "/gcs/upload/vacc", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public @ResponseBody ResponseEntity<?> uploadFile(@RequestPart(value = "file", required = true) MultipartFile file) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (file == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid file");
        }

        // Check for magic mushrooms~
        String filetype = file.getContentType();
        String filename = file.getOriginalFilename();
        String fileExt = filename.substring(filename.lastIndexOf(".") + 1);

        // Received a .oa HealthCert
        if (filetype.equals("application/octet-stream") && fileExt.equals("oa")) {
            // Attempt to upload file
            Participant updatedParticipant = uploadFile(file, auth);
            // File size too big
            if (updatedParticipant == null) {
                throw new ResponseStatusException(HttpStatus.PAYLOAD_TOO_LARGE, "Exceeded file size limit");
            }

            // Attempt to verify validity of HealthCert
            updatedParticipant = bucketUtil.verifyVaxStatus(updatedParticipant);
            return ResponseEntity.ok(updatedParticipant);
        }

        // Received a .png or .jpg or .jpeg
        if ((filetype.equals("image/jpeg") && (fileExt.equals("jpg")) || fileExt.equals("jpeg")) || (filetype.equals("image/png") && fileExt.equals("png"))) {
            try {
                boolean result = detectSafeSearch.detect(file);
                if (result) {
                    Participant updatedParticipant = uploadFile(file, auth);
                    // File size too big
                    if (updatedParticipant == null) {
                        throw new ResponseStatusException(HttpStatus.PAYLOAD_TOO_LARGE, "Exceeded file size limit");
                    }
                    return ResponseEntity.ok(updatedParticipant);
                } else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image denied, please try again with another photo.");
                }
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Upload error, please try again.");
            }
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file type");
    }

    public Participant uploadFile(MultipartFile file, Authentication auth) {
        try {
            return bucketUtil.uploadObject(file, users.findByUsername(auth.getName()).getId());
        } catch (IOException e) {
            LOGGER.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Upload error, please try again.");
        }
    }
}
