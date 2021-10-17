package com.cs203.locus.service;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventTicket;
import com.cs203.locus.repository.EventRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        Optional<Event> result = eventRepository.findById(id);
        if (result.isEmpty()) {
            return null;
        }

        return result.get();
    }

    public List<Event> findEventByOrganiser(Integer id) {
        // return null if OrganiserId not found, else return List of Events
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
        Optional<Event> result = eventRepository.findById(updatedEvent.getId());
        if (result.isEmpty()) {
            return null;
        }

        if (updatedEvent.getEndDateTime().isBefore(updatedEvent.getStartDateTime())) {
            return null;
        }

        return eventRepository.save(updatedEvent);
    }

    @Transactional
    public Event deleteEvent(Integer id) {
        Optional<Event> result = eventRepository.findById(id);
        if (result.isEmpty()) {
            return null;
        }

        Event current = result.get();
        eventRepository.delete(current);

        return current;
    }

}
