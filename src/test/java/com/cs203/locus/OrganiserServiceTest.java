package com.cs203.locus;

import com.cs203.locus.models.organiser.Organiser;
import com.cs203.locus.models.organiser.OrganiserDTO;
import com.cs203.locus.repository.OrganiserRepository;
import com.cs203.locus.service.OrganiserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.swing.text.html.Option;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class OrganiserServiceTest {

    @Mock
    OrganiserRepository organisers;

    @InjectMocks
    OrganiserService organiserService;


    @Test
    void updateOrganiser_NotFound_ReturnResponseStatusException(){
        OrganiserDTO organiserDTO = new OrganiserDTO();
        Integer organiserId = 100;

        when(organisers.findById(organiserId)).thenReturn(Optional.empty());

        Organiser updateOrganiser = organiserService.updateOrganiser(organiserId, organiserDTO);

        assertNull(updateOrganiser);
        verify(organisers).findById(organiserId);
    }

}
