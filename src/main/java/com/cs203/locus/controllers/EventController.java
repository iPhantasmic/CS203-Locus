package com.cs203.locus.controllers;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventDTO;
import com.cs203.locus.service.EventService;
import com.cs203.locus.service.EventTicketService;
import com.cs203.locus.service.OrganiserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private OrganiserService organiserService;

    @Autowired
    private EventTicketService eventTicketService;

    // List all events
    @GetMapping(value = "/list")
    public @ResponseBody ResponseEntity<?> getEvents() {
        Iterable<Event> temp = eventService.findAll();
        ArrayList<EventDTO> result = new ArrayList<>();
        for (Event event : temp) {
            EventDTO toRet = new EventDTO();
            toRet.setName(event.getName());
            toRet.setDescription(event.getDescription());
            toRet.setAddress(event.getAddress());
            toRet.setStartDateTime(event.getStartDateTime().toString());
            toRet.setEndDateTime(event.getEndDateTime().toString());
            toRet.setTag(event.getTag());
            toRet.setOrganiserId(event.getOrganiser().getId());
            result.add(toRet);
        }
        return ResponseEntity.ok(result);
    }

    // Read an Event
    @GetMapping(value = "/{id}")
    public @ResponseBody ResponseEntity<EventDTO> getEvent(@PathVariable Integer id) {
        Event result = eventService.findById(id);

        EventDTO toRet = new EventDTO();
        toRet.setName(result.getName());
        toRet.setDescription(result.getDescription());
        toRet.setAddress(result.getAddress());
        toRet.setStartDateTime(result.getStartDateTime().toString());
        toRet.setEndDateTime(result.getEndDateTime().toString());
        toRet.setTag(result.getTag());
        toRet.setOrganiserId(result.getOrganiser().getId());

        return ResponseEntity.ok(toRet);
    }

    // Create an Event
    @PostMapping(path = "/new")
    public @ResponseBody ResponseEntity<EventDTO> createEvent(@Valid @RequestBody EventDTO eventDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // TODO: handle various exceptions
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Event Fields");
        }

        eventService.createEvent(eventDTO);
        return ResponseEntity.ok(eventDTO);
    }

    @PutMapping(path = "/{id}")
    public @ResponseBody ResponseEntity<EventDTO> updateEvent(@PathVariable Integer id,
            @Valid @RequestBody EventDTO eventDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // TODO: handle various bad input
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Event Fields");
        }

        // TODO: add check that only organiser can update event
        // if (current.getOrganiserId() != userID)

        eventService.updateEvent(id, eventDTO);

        return ResponseEntity.ok(eventDTO);
    }

    @DeleteMapping(path = "/{id}")
    public @ResponseBody ResponseEntity<EventDTO> deleteEvent(@PathVariable Integer id) {
        Event deleted = eventService.deleteEvent(id);

        // TODO: add check that only organiser can delete event
        // if (current.getOrganiserId() != userID)
        EventDTO toRet = new EventDTO();
        toRet.setName(deleted.getName());
        toRet.setDescription(deleted.getDescription());
        toRet.setAddress(deleted.getAddress());
        toRet.setStartDateTime(deleted.getStartDateTime().toString());
        toRet.setEndDateTime(deleted.getEndDateTime().toString());
        toRet.setTag(deleted.getTag());
        toRet.setOrganiserId(deleted.getOrganiser().getId());

        return ResponseEntity.ok(toRet);
    }
}
