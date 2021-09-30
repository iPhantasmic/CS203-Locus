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
import java.util.List;

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
    @GetMapping(value = "/event")
    public @ResponseBody ResponseEntity<?> getEvents() {
        Iterable<Event> result = eventService.findAll();

        return ResponseEntity.ok(result);
    }

    // Read an Event
    @GetMapping(value = "/{id}")
    public @ResponseBody ResponseEntity<Event> getEvent(@PathVariable Integer id) {
        Event result = eventService.findById(id);

        return ResponseEntity.ok(result);
    }

    // Create an Event
    @PostMapping(path = "/new")
    public @ResponseBody ResponseEntity<Event> createEvent(@Valid @RequestBody EventDTO eventDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // TODO: handle various exceptions
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Event Fields");
        }

        Event created = eventService.createEvent(eventDTO);
        return ResponseEntity.ok(created);
    }

    @PutMapping(path = "/{id}")
    public @ResponseBody ResponseEntity<Event> updateEvent(@PathVariable Integer id, @Valid @RequestBody EventDTO eventDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // TODO: handle various bad input
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Event Fields");
        }

        // TODO: add check that only organiser can update event
//        if (current.getOrganiserId() != userID)

        Event updated = eventService.updateEvent(id, eventDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping(path = "/{id}")
    public @ResponseBody ResponseEntity<Event> deleteEvent(@PathVariable Integer id) {
        Event deleted = eventService.deleteEvent(id);

        // TODO: add check that only organiser can delete event
//        if (current.getOrganiserId() != userID)

        return ResponseEntity.ok(deleted);
    }
}
