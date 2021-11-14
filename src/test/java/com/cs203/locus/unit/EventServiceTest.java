package com.cs203.locus.unit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventTicket;
import com.cs203.locus.models.organiser.Organiser;
import com.cs203.locus.repository.EventRepository;
import com.cs203.locus.service.EventService;
import com.cs203.locus.service.EventTicketService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@ExtendWith(MockitoExtension.class)
public class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private EventTicketService eventTicketService;

    @InjectMocks
    private EventService eventService;



    @Test
    void getAllEvent_Success_ReturnAllEvents() {
        // mock the "findAll" operation
        when(eventRepository.findAll()).thenReturn(new ArrayList<Event>());

        // act
        Iterable<Event> returnedList = eventService.findAll();

        // assert
        assertNotNull(returnedList);
        verify(eventRepository).findAll();
    }

    @Test
    void getSingleEvent_Success_ReturnEvent() {
        // arrange
        Event event = new Event();
        event.setId(1);
        event.setName("Test Event");
        event.setDescription("Test Event");
        event.setOrganiser(new Organiser());
        event.setTag("test");
        event.setAddress("my house");
        event.setStartDateTime(LocalDateTime.now());
        event.setEndDateTime(LocalDateTime.now().plusDays(5L));
        event.setCreateAt(new Date(System.currentTimeMillis()));
        event.setUpdateAt(new Date(System.currentTimeMillis()));
        event.setEventTicket(new ArrayList<EventTicket>());

        // mock
        when(eventRepository.findById(1)).thenReturn(Optional.of(event));

        // act
        Event result = eventService.findById(1);

        // assert
        assertNotNull(result);
        verify(eventRepository).findById(event.getId());
    }

    @Test
    void getSingleEvent_InvalidEventId_ReturnNull() {
        // mock
        when(eventRepository.findById(123)).thenReturn(Optional.empty());

        // act
        Event result = eventService.findById(123);

        // assert
        assertNull(result);
        verify(eventRepository).findById(123);
    }

    @Test
    void getAllEventByOrganiserId_Success_ReturnOrganisedEventsList() {
        // mock
        when(eventRepository.findByOrganiserId(2)).thenReturn(List.of(new Event()));

        // act
        List<Event> result = eventService.findEventByOrganiser(2);

        // assert
        assertNotNull(result);
        verify(eventRepository).findByOrganiserId(2);
    }

    @Test
    void getAllEventByOrganiserId_InvalidOrganiserId_ReturnOrganisedEventsList() {
        // mock
        when(eventRepository.findByOrganiserId(2)).thenReturn(null);

        // act
        List<Event> result = eventService.findEventByOrganiser(2);

        // assert
        assertNull(result);
        verify(eventRepository).findByOrganiserId(2);
    }

    @Test
    void getAllEventsByParticipantId_Success_ReturnParticipantEventsList() {
        // mock
        when(eventTicketService.findEventTicketByParticipant(1)).thenReturn(new ArrayList<EventTicket>());

        // act
        List<Event> result = eventService.findEventByParticipant(1);

        // assert
        assertNotNull(result);
        verify(eventTicketService).findEventTicketByParticipant(1);
    }

    @Test
    void getAllEventsByParticipantId_InvalidParticipantId_ReturnParticipantEventsList() {
        // mock
        when(eventTicketService.findEventTicketByParticipant(1)).thenReturn(null);

        // act
        List<Event> result = eventService.findEventByParticipant(1);

        // assert
        assertNull(result);
        verify(eventTicketService).findEventTicketByParticipant(1);
    }

    @Test
    void addEvent_NewEvent_ReturnCreatedEvent() {
        // arrange
        Event event = new Event();
        event.setId(1);
        event.setName("Test Event");
        event.setDescription("Test Event");
        event.setOrganiser(new Organiser());
        event.setTag("test");
        event.setAddress("my house");
        event.setStartDateTime(LocalDateTime.now());
        event.setEndDateTime(LocalDateTime.now().plusDays(5L));
        event.setCreateAt(new Date(System.currentTimeMillis()));
        event.setUpdateAt(new Date(System.currentTimeMillis()));
        event.setEventTicket(new ArrayList<EventTicket>());
        // mock
        when(eventRepository.save(any(Event.class))).thenReturn(event);

        // act
        Event savedEvent = eventService.createEvent(event);

        // assert
        assertEquals(event, savedEvent);
        verify(eventRepository).save(event);
    }

    @Test
    void addEvent_InvalidNewEvent_ReturnNullEvent() {
        // arrange
        Event event = new Event();
        event.setId(1);
        event.setName("Test Event");
        event.setDescription("Test Event");
        event.setOrganiser(new Organiser());
        event.setTag("test");
        event.setAddress("my house");
        event.setStartDateTime(LocalDateTime.now());
        event.setEndDateTime(LocalDateTime.now().minusDays(5L));
        event.setCreateAt(new Date(System.currentTimeMillis()));
        event.setUpdateAt(new Date(System.currentTimeMillis()));
        event.setEventTicket(new ArrayList<EventTicket>());

        // act
        Event savedEvent = eventService.createEvent(event);

        // assert
        assertNull(savedEvent);
        verify(eventRepository, never()).save(event);
    }

    @Test
    void updateEvent_Success_ReturnUpdatedEvent() {
        // arrange
        Event event = new Event();
        event.setId(1);
        event.setName("Test Event");
        event.setDescription("Test Event");
        event.setOrganiser(new Organiser());
        event.setTag("test");
        event.setAddress("my house");
        event.setStartDateTime(LocalDateTime.now());
        event.setEndDateTime(LocalDateTime.now().plusDays(5L));
        event.setCreateAt(new Date(System.currentTimeMillis()));
        event.setUpdateAt(new Date(System.currentTimeMillis()));
        event.setEventTicket(new ArrayList<EventTicket>());

        // mock
        when(eventRepository.findById(1)).thenReturn(Optional.of(event));
        event.setDescription("new test description");
        when(eventRepository.save(any(Event.class))).thenReturn(event);

        // act
        Event resultEvent = eventService.updateEvent(event);

        // assert
        assertEquals(event, resultEvent);
        verify(eventRepository).save(event);
    }

    @Test
    void updateEvent_InvalidEventFields_ReturnUpdatedEvent() {
        // arrange
        Event event = new Event();
        event.setId(1);
        event.setName("Test Event");
        event.setDescription("Test Event");
        event.setOrganiser(new Organiser());
        event.setTag("test");
        event.setAddress("my house");
        event.setStartDateTime(LocalDateTime.now());
        event.setEndDateTime(LocalDateTime.now().plusDays(5L));
        event.setCreateAt(new Date(System.currentTimeMillis()));
        event.setUpdateAt(new Date(System.currentTimeMillis()));
        event.setEventTicket(new ArrayList<EventTicket>());

        // mock
        when(eventRepository.findById(1)).thenReturn(Optional.of(event));

        // act
        event.setEndDateTime(LocalDateTime.now().minusDays(10L));
        Event resultEvent = eventService.updateEvent(event);

        // assert
        assertNull(resultEvent);
        verify(eventRepository, never()).save(event);
    }

    @Test
    void deleteEvent_Success_ReturnDeletedEvent() {
        // arrange
        Event event = new Event();
        event.setId(1);
        event.setName("Test Event");
        event.setDescription("Test Event");
        event.setOrganiser(new Organiser());
        event.setTag("test");
        event.setAddress("my house");
        event.setStartDateTime(LocalDateTime.now());
        event.setEndDateTime(LocalDateTime.now().plusDays(5L));
        event.setCreateAt(new Date(System.currentTimeMillis()));
        event.setUpdateAt(new Date(System.currentTimeMillis()));
        event.setEventTicket(new ArrayList<EventTicket>());

        Integer id = 1;
        // mock
        when(eventRepository.findById(id)).thenReturn(Optional.of(event));

        // act
        Event deleted = eventService.deleteEvent(id);

        // assert
        assertNotNull(deleted);
        verify(eventRepository).findById(id);
        verify(eventRepository).delete(event);
    }

    @Test
    void deleteEvent_InvalidEventId_ReturnNull() {
        // mock
        Integer id = 1;
        when(eventRepository.findById(id)).thenReturn(Optional.empty());

        // act
        Event deleted = eventService.deleteEvent(id);

        // assert
        assertNull(deleted);
        verify(eventRepository, never()).deleteById(id);
    }
}
