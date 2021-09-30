package com.cs203.locus.service;

import com.cs203.locus.models.participant.ParticipantDTO;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.common.collect.Lists;
import net.bytebuddy.utility.RandomString;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.Part;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.lang.String;
import java.time.LocalDateTime;

@Service
public class BucketService {

    final String jsonPath = new ClassPathResource("locus-poc.json").getURL().getPath();;
    final GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(jsonPath))
            .createScoped(Lists.newArrayList("https://www.googleapis.com/auth/devstorage.read_write"));;

    public BucketService() throws IOException {
    }


    // TODO: Get user Vaccination Image URL based on their Username/Id
    public String viewVaccinationCert(String username){
        String url = "placeholder@123.com";
        return url;
    }


    public String uploadObject(MultipartFile file, String uploadType) throws IOException {
        if (file.getSize() > 1024 * 1024 * 10) {
            return null;
        }

        // ID of GCP Project and GCS Bucket
        String projectId = "locus-326607";
        String bucketName = "locus-poc";


        // The ID of your GCS object
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        RandomString randomString = new RandomString();

        String objectName = randomString.nextString() + LocalDateTime.now() + "." + extension;

        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).setProjectId(projectId).build().getService();
        BlobId blobId = BlobId.of(bucketName, objectName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
        storage.createFrom(blobInfo, new ByteArrayInputStream(file.getBytes()));

        // TODO: Store objectName to be tagged under a user's AWS URL
        String url = "https://storage.googleapis.com/locus-poc/" + objectName;
//
//        if (uploadType.equals("vacc")) {
//            participantDTO.setUrl("https://storage.googleapis.com/locus-poc/" + objectName);
//        }

        return url;
    }

}
