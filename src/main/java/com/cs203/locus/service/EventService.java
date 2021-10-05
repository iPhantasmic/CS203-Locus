package com.cs203.locus.service;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventDTO;
import com.cs203.locus.repository.EventRepository;
import com.cs203.locus.repository.OrganiserRepository;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private OrganiserRepository organiserRepository;

    public Iterable<Event> findAll() {
        return eventRepository.findAll();
    }

    public Event findById(Integer id) {
        if (eventRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No event with ID: " + id);
        }

        return eventRepository.findById(id).get();
    }

    public Event createEvent(EventDTO eventDTO) {
        Event newEvent = new Event();

        newEvent.setTag(eventDTO.getTag());
        newEvent.setDescription(eventDTO.getDescription());
        newEvent.setName(eventDTO.getName());
        newEvent.setAddress(eventDTO.getAddress());
        // TODO: error handling for this
        newEvent.setStartDateTime(LocalDateTime.parse(eventDTO.getStartDateTime()));
        newEvent.setEndDateTime(LocalDateTime.parse(eventDTO.getEndDateTime()));

        if (organiserRepository.findById(eventDTO.getOrganiserId()).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid Organiser ID");
        }
        newEvent.setOrganiser(organiserRepository.findById(eventDTO.getOrganiserId()).get());

        return eventRepository.save(newEvent);
    }

    public Event updateEvent(Integer id, EventDTO eventDTO) {
        if (eventRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No event with ID: " + id);
        }

        Event current = eventRepository.findById(id).get();
        current.setTag(eventDTO.getTag());
        current.setDescription(eventDTO.getDescription());
        current.setName(eventDTO.getName());
        current.setAddress(eventDTO.getAddress());
        // TODO: error handling for this
        current.setStartDateTime(LocalDateTime.parse(eventDTO.getStartDateTime()));
        current.setEndDateTime(LocalDateTime.parse(eventDTO.getEndDateTime()));
        // TODO: change organiser?
        // current.setOrganiser(eventDTO.get);

        return eventRepository.save(current);
    }

    @Transactional
    public Event deleteEvent(Integer id) {
        if (eventRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No event with ID: " + id);
        }

        Event current = eventRepository.findById(id).get();
        eventRepository.delete(current);
        return current;
    }

}
