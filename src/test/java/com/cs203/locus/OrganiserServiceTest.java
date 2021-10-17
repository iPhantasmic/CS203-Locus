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

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
public class OrganiserServiceTest {

    @Mock
    OrganiserRepository organisers;

    @InjectMocks
    OrganiserService organiserService;

    @Test
    void createOrganiser_Success_ReturnOrganiser(){
        Organiser mock = new Organiser();

        when(organisers.save(any(Organiser.class))).thenReturn((new Organiser()));

        Organiser result = organiserService.createOrganiser(mock);

        assertNotNull(result);
        verify(organisers).save(mock);
    }

    @Test
    void deleteOrganiser_Success_ReturnOrganiser(){
        Organiser mock = new Organiser();
        mock.setId(100);

        when(organisers.findById(100)).thenReturn(Optional.of(mock));
        // when(organisers.delete(mock)).thenReturn();

        Organiser result = organiserService.deleteOrganiser(mock.getId());

        assertNotNull(result);
        verify(organisers).findById((mock.getId()));
    }

    @Test
    void deleteOrganiser_NotFound_ReturnNull(){
        Organiser mock = new Organiser();
        mock.setId(100);

        when(organisers.findById(100)).thenReturn(Optional.empty());

        Organiser result = organiserService.deleteOrganiser(mock.getId());

        assertNull(result);

        verify(organisers).findById(mock.getId());
    }

    @Test
    void updateOrganiser_NotFound_ReturnNull(){
        OrganiserDTO organiserDTO = new OrganiserDTO();
        Integer organiserId = 100;

        when(organisers.findById(organiserId)).thenReturn(Optional.empty());

        Organiser updateOrganiser = organiserService.updateOrganiser(organiserId, organiserDTO);

        assertNull(updateOrganiser);
        verify(organisers).findById(organiserId);
    }

}
