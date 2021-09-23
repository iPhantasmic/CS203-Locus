package com.cs203.locus.controllers;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventDTO;
import com.cs203.locus.service.EventService;
import com.cs203.locus.service.EventTicketService;
import com.cs203.locus.service.OrganiserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@RestController
@RequestMapping("/event")
public class EventController {

    public EventService eventService;

    public OrganiserService organiserService;

    public EventTicketService eventTicketService;

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

        // TODO: add check that only organiser can update event
//        if (current.getOrganiserId() != userID)

        Event created = eventService.createEvent(eventDTO);
        return ResponseEntity.ok(created);
    }

    @PutMapping(path = "/{id}")
    public @ResponseBody ResponseEntity<Event> updateEvent(@PathVariable Integer id, @Valid @RequestBody EventDTO eventDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // TODO: handle various bad input
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Event Fields");
        }

        Event updated = eventService.updateEvent(id, eventDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping(path = "/{id}")
    public @ResponseBody ResponseEntity<Event> deleteEvent(@PathVariable Integer id) {
        Event deleted = eventService.deleteEvent(id);

        return ResponseEntity.ok(deleted);
    }
}
