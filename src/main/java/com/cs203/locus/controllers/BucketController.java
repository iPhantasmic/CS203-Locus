package com.cs203.locus.controllers;

import com.cs203.locus.service.BucketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin
public class BucketController {

    @Autowired
    BucketService bucketService;


    @PostMapping(path = "/gcs/upload/vacc", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public @ResponseBody ResponseEntity<String> uploadFile(@RequestPart(value = "file", required = true) MultipartFile file) {
        try {
            bucketService.uploadObject(file, file.getOriginalFilename(), "vacc");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok("Image uploaded successfully");
    }
}
