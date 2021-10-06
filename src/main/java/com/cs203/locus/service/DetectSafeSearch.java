package com.cs203.locus.service;

import com.google.api.gax.core.CredentialsProvider;
import com.google.cloud.vision.v1.AnnotateImageRequest;
import com.google.cloud.vision.v1.AnnotateImageResponse;
import com.google.cloud.vision.v1.BatchAnnotateImagesResponse;
import com.google.cloud.vision.v1.Feature;
import com.google.cloud.vision.v1.Image;
import com.google.cloud.vision.v1.ImageAnnotatorClient;
import com.google.cloud.vision.v1.SafeSearchAnnotation;
import com.google.protobuf.ByteString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gcp.vision.CloudVisionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class DetectSafeSearch {

    @Autowired
    private CloudVisionTemplate cloudVisionTemplate;

    // Detects whether the specified image has features you would want to moderate.
    public boolean detect(MultipartFile filePath) throws IOException {
        List<AnnotateImageRequest> requests = new ArrayList<>();

        ByteString imgBytes = ByteString.readFrom(new ByteArrayInputStream(filePath.getBytes()));

        Image img = Image.newBuilder().setContent(imgBytes).build();
        Feature feat = Feature.newBuilder().setType(Feature.Type.SAFE_SEARCH_DETECTION).build();
        AnnotateImageRequest request =
                AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
        requests.add(request);

        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests. After completing all of your requests, call
        // the "close" method on the client to safely clean up any remaining background resources.
        try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
            BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();

            for (AnnotateImageResponse res : responses) {
                if (res.hasError()) {
                    System.out.format("Error: %s%n", res.getError().getMessage());
                    return false;
                }

                // Validate SafeSearch values
                SafeSearchAnnotation annotation = res.getSafeSearchAnnotation();
                if (annotation.getAdultValue() >= 3 || annotation.getMedicalValue() >= 3
                        || annotation.getViolenceValue() >= 3 || annotation.getRacyValue() >= 3) {
                    System.out.println("Image rejected");
                    System.out.format(
                            "adult: %s%nmedical: %s%nviolence: %s%nracy: %s%n",
                            annotation.getAdult(),
                            annotation.getMedical(),
                            annotation.getViolence(),
                            annotation.getRacy());
                    return false;
                }
            }
        }
        return true;
    }
}