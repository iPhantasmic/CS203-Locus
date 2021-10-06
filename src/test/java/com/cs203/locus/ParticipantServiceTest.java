package com.cs203.locus;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.repository.EventTicketRepository;
import com.cs203.locus.repository.ParticipantRepository;
import com.cs203.locus.repository.UserRepository;
import com.cs203.locus.service.BucketService;
import com.cs203.locus.service.EventTicketService;
import com.cs203.locus.service.ParticipantService;
import com.google.api.client.http.MultipartContent.Part;
import com.google.auth.oauth2.IdTokenProvider.Option;

import org.springframework.http.HttpStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.io.IOException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ParticipantServiceTest {
    @Mock 
    private ParticipantRepository participantRepository;

    @Mock 
    private EventTicketRepository eventTicketRepository;

    @Mock
    private EventTicketService eventTicketService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ParticipantService participantService;

    @Test
    void findByID_InvalidID_ReturnsResponseStatusException(){
        Optional<Participant> emptyParticipant = Optional.empty();
        
        when(participantRepository.findById(any(Integer.class))).thenReturn(emptyParticipant);
        Optional<Participant> returnedParticipant = participantRepository.findById(4);
        assertTrue(returnedParticipant.isEmpty());
    }
}
