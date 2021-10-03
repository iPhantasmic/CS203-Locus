package com.cs203.locus.service;


import com.cs203.locus.repository.ParticipantRepository;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.common.collect.Lists;
import net.bytebuddy.utility.RandomString;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class BucketService {

    @Autowired
    ParticipantRepository participants;

    // TODO: Get user Vaccination Image URL based on their Username/Id
    public String viewVaccinationCert(String username){
        String url = "placeholder@123.com";
        return url;
    }


    public String uploadObject(MultipartFile file) throws IOException {
        // Check size of file object
        if (file.getSize() > 1024 * 1024 * 100) {
            return null;
        }

        // ID of GCP Project and GCS Bucket
        String bucketName = "locus-poc";

        // The ID of your GCS object
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        RandomString randomString = new RandomString();
        String objectName = randomString.nextString() + LocalDateTime.now() + "." + extension;

        Storage storage = StorageOptions.newBuilder().build().getService();
        BlobId blobId = BlobId.of(bucketName, objectName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
        storage.createFrom(blobInfo, new ByteArrayInputStream(file.getBytes()));

        // TODO: Store objectName to be tagged under a user's AWS URL
        String url = "https://storage.googleapis.com/locus-poc/" + objectName;

        return url;
    }

}