package com.cs203.locus.controllers;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventDTO;
import com.cs203.locus.models.eventtype.EventType;
import com.cs203.locus.models.organiser.Organiser;
import com.cs203.locus.service.EventService;
import com.cs203.locus.service.EventTypeService;
import com.cs203.locus.service.OrganiserService;
import com.cs203.locus.util.EmailUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.cs203.locus.service.UserService;
import com.cs203.locus.util.GeoCodingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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
    private EventTypeService eventTypeService;
  
    @Autowired
    private OrganiserService organiserService;
  
    @Autowired
    private UserService userService;
  
    @Autowired
    private EmailUtil emailUtil;

    @Autowired
    private GeoCodingUtil geoCodingUtil;

    // List all Public events
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
            toRet.setLat(event.getLat());
            toRet.setLng(event.getLng());
            toRet.setInviteCode(event.getInviteCode());
            toRet.setType(event.getType().getType());
            toRet.setPrivate(event.isPrivate());
            result.add(toRet);
        }

        return ResponseEntity.ok(result);
    }

    // List all events for a Participant
    @GetMapping(value = "/listParticipantEvents/{id}")
    public @ResponseBody
    ResponseEntity<?> getAllEventsByParticipant(@PathVariable Integer id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // We only allow Admin or the User itself. Hence, if not both, give 403 Forbidden
        if (!auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))
                && !userService.findByUsername(auth.getName()).getId().equals(id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

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
            toRet.setLat(event.getLat());
            toRet.setLng(event.getLng());
            toRet.setInviteCode(event.getInviteCode());
            toRet.setType(event.getType().getType());
            toRet.setPrivate(event.isPrivate());
            result.add(toRet);
        }
        return ResponseEntity.ok(result);
    }

    // List all events of an Organiser
    @GetMapping(value = "/listOrganiserEvents/{id}")
    public @ResponseBody
    ResponseEntity<?> getAllEventsByOrganiser(@PathVariable Integer id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // We only allow Admin or the User itself. Hence, if not both, give 403 Forbidden
        if (!auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))
                && !userService.findByUsername(auth.getName()).getId().equals(id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        Iterable<Event> temp = eventService.findEventByOrganiser(id);
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
            toRet.setLat(event.getLat());
            toRet.setLng(event.getLng());
            toRet.setInviteCode(event.getInviteCode());
            toRet.setType(event.getType().getType());
            toRet.setPrivate(event.isPrivate());
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

        Event event = eventService.findById(id);
        // Protect Private Events
        if (event.isPrivate()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

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
        toRet.setLat(event.getLat());
        toRet.setLng(event.getLng());
        toRet.setInviteCode(event.getInviteCode());
        toRet.setType(event.getType().getType());
        toRet.setPrivate(event.isPrivate());

        return ResponseEntity.ok(toRet);
    }

    @GetMapping(value = "/invite/{inviteCode}")
    public @ResponseBody
    ResponseEntity<EventDTO> getEventByInviteCode(@PathVariable String inviteCode) {
        Event event = eventService.findByInviteCode(inviteCode);

        if (event == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "No event with invite code: " + inviteCode);
        }

        EventDTO toRet = new EventDTO();
        toRet.setId(event.getId());
        toRet.setInviteCode(event.getInviteCode());
        toRet.setName(event.getName());
        toRet.setDescription(event.getDescription());
        toRet.setAddress(event.getAddress());
        toRet.setStartDateTime(event.getStartDateTime().toString());
        toRet.setEndDateTime(event.getEndDateTime().toString());
        toRet.setTag(event.getTag());
        toRet.setImageGcsUrl(event.getImageGcsUrl());
        toRet.setLng(event.getLng());
        toRet.setLat(event.getLat());
        toRet.setOrganiserId(event.getOrganiser().getId());
        toRet.setType(event.getType().getType());
        toRet.setPrivate(event.isPrivate());

        return ResponseEntity.ok(toRet);
    }

    // Create an Event
    @PostMapping(path = "/new")
    public @ResponseBody
    ResponseEntity<EventDTO> createEvent(@Valid @RequestBody EventDTO eventDTO,
                                         BindingResult bindingResult) {
        System.out.println(eventDTO);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        int organiserId = userService.findByUsername(auth.getName()).getId();

        if (bindingResult.hasErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Event Fields");
        }

        Event newEvent = new Event();

        newEvent.setTag(eventDTO.getTag());
        newEvent.setDescription(eventDTO.getDescription());
        newEvent.setName(eventDTO.getName());
        newEvent.setAddress(eventDTO.getAddress());
        newEvent.setPrivate(eventDTO.isPrivate());
        EventType eventType = eventTypeService.findByType(eventDTO.getType());
        if (eventType == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid EventType");
        }
        newEvent.setType(eventType);
        newEvent.setImageGcsUrl(eventDTO.getImageGcsUrl());
        try {
            newEvent.setStartDateTime(LocalDateTime.parse(eventDTO.getStartDateTime()));
            newEvent.setEndDateTime(LocalDateTime.parse(eventDTO.getEndDateTime()));
        } catch (DateTimeParseException e) {
            // Expects this format: 2007-12-03T10:15:30
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid Date/Time");
        }
        try {
            double[] geoCode = geoCodingUtil.getGeoCode(eventDTO.getAddress());
            newEvent.setLat(geoCode[0]);
            newEvent.setLng(geoCode[1]);
        } catch (Exception e) {
            e.printStackTrace();
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
            emailUtil.sendEventCreationEmail(formModel);
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
    @PutMapping(path = "/{id}")
    public @ResponseBody
    ResponseEntity<EventDTO> updateEvent(@PathVariable Integer id,
                                         @Valid @RequestBody EventDTO eventDTO, BindingResult bindingResult) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (eventService.findById(id) == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        int organiserId = eventService.findById(id).getOrganiser().getId();
        // We only allow Admin or the Organiser himself. Hence, if not both, give 403 Forbidden
        if (!auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) &&
                !userService.findByUsername(auth.getName()).getId().equals(organiserId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        if (bindingResult.hasErrors()) {
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
        try {
            current.setStartDateTime(LocalDateTime.parse(eventDTO.getStartDateTime()));
            current.setEndDateTime(LocalDateTime.parse(eventDTO.getEndDateTime()));
        } catch (DateTimeParseException e) {
            // Expects this format: 2007-12-03T10:15:30
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid Date/Time");
        }
        current.setOrganiser(organiserService.findById(eventDTO.getOrganiserId()));

        eventService.updateEvent(current);

        return ResponseEntity.ok(eventDTO);
    }

    // delete an event
    @DeleteMapping(path = "/{id}")
    public @ResponseBody
    ResponseEntity<EventDTO> deleteEvent(@PathVariable Integer id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (eventService.findById(id) == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        int organiserId = eventService.findById(id).getOrganiser().getId();
        // We only allow Admin or the Organiser himself. Hence, if not both, give 403 Forbidden
        if (!auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) &&
                !userService.findByUsername(auth.getName()).getId().equals(organiserId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        Event event = eventService.deleteEvent(id);
        if (event == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No event with ID: " + id);
        }

        EventDTO toRet = new EventDTO();
        toRet.setName(event.getName());
        toRet.setDescription(event.getDescription());
        toRet.setAddress(event.getAddress());
        toRet.setStartDateTime(event.getStartDateTime().toString());
        toRet.setEndDateTime(event.getEndDateTime().toString());
        toRet.setTag(event.getTag());
        toRet.setOrganiserId(event.getOrganiser().getId());
        toRet.setImageGcsUrl(event.getImageGcsUrl());
        toRet.setLat(event.getLat());
        toRet.setLng(event.getLng());
        toRet.setInviteCode(event.getInviteCode());
        toRet.setType(event.getType().getType());
        toRet.setPrivate(event.isPrivate());

        return ResponseEntity.ok(toRet);
    }
}
