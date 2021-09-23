package com.cs203.creditswees.service;

import com.cs203.creditswees.models.event.Event;
import com.cs203.creditswees.models.event.EventDTO;
import com.cs203.creditswees.repository.EventRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;

@Service
public class EventService {

    final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
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
        newEvent.setStartDate(eventDTO.getStartDate());
        newEvent.setEndDate(eventDTO.getEndDate());
        newEvent.setStartTime(eventDTO.getStartTime());
        newEvent.setEndTime(eventDTO.getEndTime());
        // TODO: set organiser
//        newEvent.setOrganiser(userID);

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
        current.setStartDate(eventDTO.getStartDate());
        current.setEndDate(eventDTO.getEndDate());
        current.setStartTime(eventDTO.getStartTime());
        current.setEndTime(eventDTO.getEndTime());
        // TODO: set organiser
        // newEvent.setOrganiser(userID);

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
