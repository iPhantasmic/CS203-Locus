package com.cs203.locus;

import com.cs203.locus.service.BucketService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BucketServiceTest {

    @Mock
    BucketService bucketService;

//    @Test
//    void addObject_NewObject_ReturnURL() throws IOException {
//        // Intialise 2MB file
//        byte[] fileSize = new byte[1024 * 1024 * 10];
//        MultipartFile file = new MockMultipartFile("New Image Object", fileSize);
//        when(bucketService.uploadObject(file, "vacc")).thenReturn(null);
//
//        String bucketService.uploadObject()
//    }
//
//    @Test
//    void addObject_NewObject_ReturnURL(){
//        // Intialise 2MB file
//        byte[] fileSize = new byte[1024 * 1024 * 2];
//        MultipartFile file = new MockMultipartFile("New Image Object", fileSize);
//        when(bucketService.uploadObject(file, "vacc")).thenReturn(null);
//    }
//
//    @Test
//    void addObject_NewObject_ReturnURL(){
//        // Intialise 2MB file
//        byte[] fileSize = new byte[1024 * 1024 * 2];
//        MultipartFile file = new MockMultipartFile("New Image Object", fileSize);
//        when(bucketService.uploadObject(file, "vacc")).thenReturn(null);
//    }
//
//    @Test
//    void addObject_SameName_Overwrite(){
//
//
//    }

}
