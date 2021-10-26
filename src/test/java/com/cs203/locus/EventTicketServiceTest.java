package com.cs203.locus;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventTicket;
import com.cs203.locus.models.organiser.Organiser;
import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.repository.EventTicketRepository;
import com.cs203.locus.service.EventTicketService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Optional;


@ExtendWith(MockitoExtension.class)
public class EventTicketServiceTest {

    @Mock
    private EventTicketRepository eventTickets;

    @InjectMocks
    private EventTicketService eventTicketService;


    @Test
    void getAllEventTickets_Success_ReturnAllEventTickets() {
        // mock the "findAll" operation
        when(eventTickets.findAll()).thenReturn(new ArrayList<EventTicket>());

        // act
        Iterable<EventTicket> returnedList = eventTicketService.findAll();

        // assert
        assertNotNull(returnedList);
        verify(eventTickets).findAll();
    }

    @Test
    void getEventTicket_Success_ReturnEventTicket() {
        // arrange
        EventTicket ticket = new EventTicket();
        ticket.setId(1);
        ticket.setEvent(new Event());
        ticket.setParticipant(new Participant());

        // mock
        when(eventTickets.findById(1)).thenReturn(Optional.of(ticket));

        // act
        EventTicket result = eventTicketService.findById(1);

        // assert
        assertNotNull(result);
        assertEquals(ticket,result);
        verify(eventTickets).findById(ticket.getId());
    }

    @Test
    void getEventTicket_InvalidTicketId_ReturnNull() {
        // mock
        when(eventTickets.findById(123)).thenReturn(Optional.empty());

        // act
        EventTicket result = eventTicketService.findById(123);

        // assert
        assertNull(result);
        verify(eventTickets).findById(123);
    }

    @Test
    void addEventTicket_Success_ReturnCreatedEventTicket() {
        // arrange
        EventTicket ticket = new EventTicket();
        ticket.setId(1);
        ticket.setParticipant(new Participant());
        ticket.setEvent(new Event());

        // mock
        when(eventTickets.save(any(EventTicket.class))).thenReturn(ticket);

        // act
        EventTicket savedTicket = eventTicketService.addTicket(ticket);

        // assert
        assertEquals(ticket, savedTicket);
        verify(eventTickets).save(ticket);
    }

    @Test
    void getEventTicketForUser_Success_ReturnEventTicketList() {
        // mock the "findAll" operation
        when(eventTickets.findByParticipantId(1)).thenReturn(new ArrayList<EventTicket>());

        // act
        Iterable<EventTicket> returnedList = eventTicketService.findEventTicketByParticipant(1);

        // assert
        assertNotNull(returnedList);
        verify(eventTickets).findByParticipantId(1);
    }

    @Test
    void deleteEventTicket_Success_ReturnDeletedEventTicket() {
        // arrange
        EventTicket ticket = new EventTicket();
        ticket.setEvent(new Event());
        ticket.setId(1);
        ticket.setParticipant(new Participant());

        Integer id = 1;
        // mock
        when(eventTickets.findById(id)).thenReturn(Optional.of(ticket));

        // act
        EventTicket deleted = eventTicketService.deleteById(id);

        // assert
        assertNotNull(deleted);
        assertEquals(ticket, deleted);
        verify(eventTickets).findById(id);
        verify(eventTickets).delete(ticket);
    }

    @Test
    void deleteEventTicket_InvalidEventTicketId_ReturnDeletedEventTicket() {
        // mock
        Integer id = 1;
        when(eventTickets.findById(id)).thenReturn(Optional.empty());

        // act
        EventTicket deleted = eventTicketService.deleteById(id);

        // assert
        assertNull(deleted);
        verify(eventTickets, never()).deleteById(id);
    }
}
