//package com.cs203.locus;
//
//import com.cs203.locus.models.participant.Participant;
//import com.cs203.locus.repository.ParticipantRepository;
//import com.cs203.locus.service.BucketService;
//import com.cs203.locus.service.ParticipantService;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//import static org.junit.jupiter.api.Assertions.assertNull;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//
//@ExtendWith(MockitoExtension.class)
//public class BucketServiceTest {
//
//    @Mock
//    private ParticipantRepository participantRepository;
//
//    @Mock
//    private ParticipantService participantService;
//
//    @InjectMocks
//    private BucketService bucketService;
//
//    @Test
//    void addFile_NewObject_ReturnURL() throws IOException {
//        Participant participant = new Participant();
//        participant.setId(1);
//        MultipartFile mockFile = new MockMultipartFile("image", "image.png", "img/jpeg" ,new byte[1024 * 1024 * 10]);
//
//        when(participantRepository.save(any(Participant.class))).thenReturn(participant);
//
//        Participant savedParticipant = bucketService.uploadObject(mockFile,1);
//
//        assertNotNull(savedParticipant);
//        verify(participantRepository).findById(participant.getId());
//        verify(participantRepository).save(participant);
//    }
//
//    @Test
//    void addFile_TooBig_ReturnNull() throws IOException {
//        Participant participant = new Participant();
//        MultipartFile large_mockFile = new MockMultipartFile("image", "image.png", "img/jpeg" ,new byte[1024 * 1024 * 1000]);
//        when(bucketService.uploadObject(large_mockFile, 1)).thenReturn(null);
//
//        Participant savedParticipant = bucketService.uploadObject(large_mockFile, 1);
//        assertNull(savedParticipant);
//    }
//
//    @Test
//    void addFile_NullObject_ReturnNull() throws IOException {
//
//    }
//
//
////    @Test
////    void addObject_NewObject_ReturnURL() throws IOException {
////        // Intialise 2MB file
////        byte[] fileSize = new byte[1024 * 1024 * 10];
////        MultipartFile file = new MockMultipartFile("New Image Object", fileSize);
////        when(bucketService.uploadObject(file, "vacc")).thenReturn(null);
////
////        String bucketService.uploadObject()
////    }
////
////    @Test
////    void addObject_NewObject_ReturnURL(){
////        // Intialise 2MB file
////        byte[] fileSize = new byte[1024 * 1024 * 2];
////        MultipartFile file = new MockMultipartFile("New Image Object", fileSize);
////        when(bucketService.uploadObject(file, "vacc")).thenReturn(null);
////    }
////
////    @Test
////    void addObject_NewObject_ReturnURL(){
////        // Intialise 2MB file
////        byte[] fileSize = new byte[1024 * 1024 * 2];
////        MultipartFile file = new MockMultipartFile("New Image Object", fileSize);
////        when(bucketService.uploadObject(file, "vacc")).thenReturn(null);
////    }
////
////    @Test
////    void addObject_SameName_Overwrite(){
////
////
////    }
//
//}
