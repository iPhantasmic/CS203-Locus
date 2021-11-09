package com.cs203.locus.util;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.service.ParticipantService;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import net.bytebuddy.utility.RandomString;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;


@Service
public class BucketUtil {

    @Autowired
    ParticipantService participantService;
    @Value("${oa.healthcert.url}")
    String VERIFY_HEALTHCERT_URL;

    private static final Logger LOGGER = LoggerFactory.getLogger(BucketUtil.class);


    public Participant uploadObject(MultipartFile file, Integer id) throws IOException {
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

        String url = "https://storage.googleapis.com/locus-poc/" + objectName;

        return participantService.updateVaxGcsUrl(id, url);
    }

    public Participant verifyVaxStatus(Participant participant) {
        String healthCertFileUrl = participant.getVaxGcsUrl();
        try {
            // First obtain contents of vaccination certificate from uploaded .oa file
            HttpRequest requestForHealthCert = HttpRequest.newBuilder()
                    .uri(new URI(healthCertFileUrl))
                    .GET()
                    .build();
            HttpResponse<String> oaFileContents = HttpClient.newBuilder()
                    .build()
                    .send(requestForHealthCert, HttpResponse.BodyHandlers.ofString());

            // Now make a request to validate the contents of the .oa file
            HttpRequest requestVerification = HttpRequest.newBuilder()
                    .uri(new URI(VERIFY_HEALTHCERT_URL))
                    .headers("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(oaFileContents.body()))
                    .build();
            HttpResponse<String> result = HttpClient.newBuilder()
                    .build()
                    .send(requestVerification, HttpResponse.BodyHandlers.ofString());

            if (result.statusCode() == 200) {
                // successfully verified, set vaxStatus in DB to true
                return participantService.verifyParticipant(participant.getId());
            }
        } catch (URISyntaxException | IOException | InterruptedException e) {
            LOGGER.error(e.getMessage());
        }

        // HTTP 400 or any other error/exception, means verification failed
        return participant;
    }
}
