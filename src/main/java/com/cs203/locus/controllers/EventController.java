package com.cs203.locus.controllers;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventDTO;
import com.cs203.locus.models.organiser.Organiser;
import com.cs203.locus.service.EventService;
import com.cs203.locus.service.OrganiserService;
import com.cs203.locus.util.EmailUtilService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.cs203.locus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/event")
public class EventController {

    private static final Logger LOGGER = LoggerFactory.getLogger(EventController.class);

    @Autowired
    private EventService eventService;
  
    @Autowired
    private OrganiserService organiserService;
  
    @Autowired
    private UserService userService;
  
    @Autowired
    private EmailUtilService emailUtilService;

    // List all events
    @GetMapping(value = "/list")
    public @ResponseBody
    ResponseEntity<?> getAllEvents() {
        Iterable<Event> temp = eventService.findAll();
        ArrayList<EventDTO> result = new ArrayList<>();
        for (Event event : temp) {
            EventDTO toRet = new EventDTO();
            toRet.setId(event.getId());
            toRet.setName(event.getName());
            toRet.setDescription(event.getDescription());
            toRet.setAddress(event.getAddress());
            toRet.setStartDateTime(event.getStartDateTime().toString());
            toRet.setEndDateTime(event.getEndDateTime().toString());
            toRet.setTag(event.getTag());
            toRet.setOrganiserId(event.getOrganiser().getId());
            toRet.setImageGcsUrl(event.getImageGcsUrl());
            result.add(toRet);
        }
        return ResponseEntity.ok(result);
    }

    // List all events for a Participant
    @GetMapping(value = "/listParticipantEvents/{id}")
    // TODO: need to configure such that a user can list only his own participating events
    public @ResponseBody
    ResponseEntity<?> getAllEventsByParticipant(@PathVariable Integer id) {
        List<Event> temp = eventService.findEventByParticipant(id);
        ArrayList<EventDTO> result = new ArrayList<>();

        for (Event event : temp) {
            EventDTO toRet = new EventDTO();
            toRet.setId(event.getId());
            toRet.setName(event.getName());
            toRet.setDescription(event.getDescription());
            toRet.setAddress(event.getAddress());
            toRet.setStartDateTime(event.getStartDateTime().toString());
            toRet.setEndDateTime(event.getEndDateTime().toString());
            toRet.setTag(event.getTag());
            toRet.setOrganiserId(event.getOrganiser().getId());
            toRet.setImageGcsUrl(event.getImageGcsUrl());
            result.add(toRet);
        }
        return ResponseEntity.ok(result);
    }

    // List all events of an Organiser
    @GetMapping(value = "/listOrganiserEvents/{id}")
    // TODO: need to configure such that a user can list only events he is organising
    public @ResponseBody
    ResponseEntity<?> getAllEventsByOrganiser(@PathVariable Integer id) {
        Iterable<Event> temp = eventService.findEventByOrganiser(id);
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
            toRet.setId(event.getId());
            toRet.setImageGcsUrl(event.getImageGcsUrl());
            result.add(toRet);
        }
        return ResponseEntity.ok(result);
    }

    // Read an Event
    @GetMapping(value = "/{id}")
    public @ResponseBody
    ResponseEntity<EventDTO> getEvent(@PathVariable Integer id) {
        if (eventService.findById(id) == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No event with ID: " + id);
        }

        Event result = eventService.findById(id);

        EventDTO toRet = new EventDTO();
        toRet.setName(result.getName());
        toRet.setDescription(result.getDescription());
        toRet.setAddress(result.getAddress());
        toRet.setStartDateTime(result.getStartDateTime().toString());
        toRet.setEndDateTime(result.getEndDateTime().toString());
        toRet.setTag(result.getTag());
        toRet.setOrganiserId(result.getOrganiser().getId());
        toRet.setImageGcsUrl(result.getImageGcsUrl());

        return ResponseEntity.ok(toRet);
    }

    @GetMapping(value = "/invite/{inviteCode}")
    public @ResponseBody
    ResponseEntity<EventDTO> getEventByInviteCode(@PathVariable String inviteCode) {
        Event result = eventService.findByInviteCode(inviteCode);

        if (result == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "No event with invite code: " + inviteCode);
        }

        EventDTO toRet = new EventDTO();
        toRet.setInviteCode(result.getInviteCode());
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
    public @ResponseBody
    ResponseEntity<EventDTO> createEvent(@Valid @RequestBody EventDTO eventDTO,
                                         BindingResult bindingResult) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        int organiserId = userService.findByUsername(auth.getName()).getId();

        if (bindingResult.hasErrors()) {
            // TODO: handle various exceptions
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Event Fields");
        }

        Event newEvent = new Event();

        newEvent.setTag(eventDTO.getTag());
        newEvent.setDescription(eventDTO.getDescription());
        newEvent.setName(eventDTO.getName());
        newEvent.setAddress(eventDTO.getAddress());
        newEvent.setPrivate(eventDTO.isPrivate());
        try {
            newEvent.setStartDateTime(LocalDateTime.parse(eventDTO.getStartDateTime()));
            newEvent.setEndDateTime(LocalDateTime.parse(eventDTO.getEndDateTime()));
        } catch (DateTimeParseException e) {
            // Expects this format: 2007-12-03T10:15:30
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid Date/Time");
        }

        if (organiserService.findById(organiserId) == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid Organiser ID");
        } else {
            newEvent.setOrganiser(organiserService.findById(organiserId));
        }

        Event created = eventService.createEvent(newEvent);
        if (created == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid Event Fields");
        }
        Organiser organiser = organiserService.findById(eventDTO.getOrganiserId());
        newEvent.setOrganiser(organiser);

        Map<String, Object> formModel = new HashMap<>();
        formModel.put("recipientEmailAddress", organiser.getUser().getEmail());
        formModel.put("userName", organiser.getUser().getName());
        formModel.put("eventName", eventDTO.getName());
        formModel.put("eventId", eventDTO.getId());

        // Send an Email to the organiser to let them know they have successfully created the event
        try {
            emailUtilService.sendEventCreationEmail(formModel);
        }catch (Exception e){
            LOGGER.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unknown error occurs, please try again!");
        }

        eventDTO.setOrganiserId(created.getOrganiser().getId());
        eventDTO.setInviteCode(created.getInviteCode());
        eventDTO.setId(created.getId());
        return ResponseEntity.ok(eventDTO);
    }

    // update an event
    // TODO: need to configure such that only an organiser can update his own event
    @PutMapping(path = "/{id}")
    public @ResponseBody
    ResponseEntity<EventDTO> updateEvent(@PathVariable Integer id,
                                         @Valid @RequestBody EventDTO eventDTO, BindingResult bindingResult) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (bindingResult.hasErrors()) {
            // TODO: handle various bad input
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Event Fields");
        }

        if (eventService.findById(id) == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No event with ID: " + id);
        }

        if (organiserService.findById(eventDTO.getOrganiserId()) == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No Organiser with ID: " + eventDTO.getOrganiserId());
        }

        Event current = eventService.findById(id);
        current.setTag(eventDTO.getTag());
        current.setDescription(eventDTO.getDescription());
        current.setName(eventDTO.getName());
        current.setAddress(eventDTO.getAddress());
        // TODO: error handling for LocalDateTime.parse
        current.setStartDateTime(LocalDateTime.parse(eventDTO.getStartDateTime()));
        current.setEndDateTime(LocalDateTime.parse(eventDTO.getEndDateTime()));
        current.setOrganiser(organiserService.findById(eventDTO.getOrganiserId()));

        eventService.updateEvent(current);

        return ResponseEntity.ok(eventDTO);
    }

    // delete an event
    // TODO: need to configure such that only an organiser can delete his own event
    @DeleteMapping(path = "/{id}")
    public @ResponseBody
    ResponseEntity<EventDTO> deleteEvent(@PathVariable Integer id) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (eventService.deleteEvent(id) == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No event with ID: " + id);
        }

        Event deleted = eventService.deleteEvent(id);

        EventDTO toRet = new EventDTO();
        toRet.setName(deleted.getName());
        toRet.setDescription(deleted.getDescription());
        toRet.setAddress(deleted.getAddress());
        toRet.setStartDateTime(deleted.getStartDateTime().toString());
        toRet.setEndDateTime(deleted.getEndDateTime().toString());
        toRet.setTag(deleted.getTag());
        toRet.setOrganiserId(deleted.getOrganiser().getId());
        toRet.setImageGcsUrl(deleted.getImageGcsUrl());

        return ResponseEntity.ok(toRet);
    }
}
