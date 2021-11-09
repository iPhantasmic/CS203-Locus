package com.cs203.locus.service;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventTicket;
import com.cs203.locus.repository.EventRepository;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
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
        return eventRepository.findByIsPrivateFalse();
    }

    public Event findById(Integer id) {
        Optional<Event> result = eventRepository.findById(id);
        if (result.isEmpty()) {
            return null;
        }

        if (result.get().isPrivate()) {
            return null;
        }

        return result.get();
    }

    public Event findByInviteCode(String code) {
        return eventRepository.findByInviteCode(code);
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

        if (!newEvent.getStartDateTime().isAfter(LocalDateTime.now()) || !newEvent.getEndDateTime().isAfter(LocalDateTime.now())) {
            return null;
        }

        Event saved = eventRepository.save(newEvent);

        // Generate inviteCode for events
        String prefix = RandomStringUtils.randomAlphanumeric(5);
        String inviteCode = prefix + saved.getId().toString();
        saved.setInviteCode(inviteCode);

        return eventRepository.save(saved);
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
