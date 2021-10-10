package com.cs203.locus.service;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventTicket;
import com.cs203.locus.repository.EventRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private EventTicketService eventTicketService;


    public Iterable<Event> findAll() {
        return eventRepository.findAll();
    }

    public Event findById(Integer id) {
        if (eventRepository.findById(id).isEmpty()) {
            return null;
        }

        return eventRepository.findById(id).get();
    }

    public List<Event> findEventByOrganiser(Integer id) {
        // will return if OrganiserId not found, else return List of Events
        return eventRepository.findByOrganiserId(id);
    }

    public List<Event> findEventByParticipant(Integer id) {
        Iterable<EventTicket> temp = eventTicketService.findEventTicketByParticipant(id);
        if (temp == null) {
            return null;
        }

        List<Event> toRet = new ArrayList<>();
        for (EventTicket eventTicket: temp) {
            toRet.add(eventTicket.getEvent());
        }

        return toRet;
    }

    public Event createEvent(Event newEvent) {
        if (newEvent.getEndDateTime().isBefore(newEvent.getStartDateTime())) {
            return null;
        }

        return eventRepository.save(newEvent);
    }

    public Event updateEvent(Event updatedEvent) {
        if (eventRepository.findById(updatedEvent.getId()).isEmpty()) {
            return null;
        }

        if (updatedEvent.getEndDateTime().isBefore(updatedEvent.getStartDateTime())) {
            return null;
        }

        return eventRepository.save(updatedEvent);
    }

    @Transactional
    public Event deleteEvent(Integer id) {
        if (eventRepository.findById(id).isEmpty()) {
            return null;
        }

        Event current = eventRepository.findById(id).get();
        eventRepository.delete(current);
        return current;
    }

}
