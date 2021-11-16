package com.cs203.locus.controllers;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventTicket;
import com.cs203.locus.models.event.EventTicketDTO;
import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.service.EventService;
import com.cs203.locus.service.EventTicketService;
import com.cs203.locus.service.ParticipantService;
import com.cs203.locus.util.EmailUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.cs203.locus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/ticket")
public class EventTicketController {

    private static final Logger LOGGER = LoggerFactory.getLogger(EventTicketController.class);

    @Autowired
    private EventTicketService eventTicketService;
    @Autowired
    private EventService eventService;
    @Autowired
    private ParticipantService participantService;
    @Autowired
    private UserService userService;
    @Autowired
    private EmailUtil emailUtil;


    @GetMapping(value = "/list/{id}")
    public @ResponseBody
    ResponseEntity<?> getAllEventTicketsByEventID(@PathVariable Integer id) {
        Iterable<EventTicket> temp = eventTicketService.findEventTicketByEventId(id);
        ArrayList<EventTicketDTO> result = new ArrayList<>();
        for (EventTicket eventTicket : temp) {
            result.add(getEventTicketDTOFromEventTicket(eventTicket));
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public @ResponseBody
    ResponseEntity<EventTicketDTO> findById(@PathVariable Integer id) {
        EventTicket eventTicket = eventTicketService.findById(id);

        if (eventTicket == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No EventTicket with ID: " + id);
        }
        return ResponseEntity.ok(getEventTicketDTOFromEventTicket(eventTicket));
    }

    // TODO: ensure participant can only access his own list of EventTickets
    @GetMapping(value = "/listParticipantTickets/{id}")
    public @ResponseBody
    ResponseEntity<ArrayList<EventTicketDTO>> getParticipantTickets(@PathVariable Integer id) {
        if (participantService.findById(id) == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No Participant with ID: " + id);
        }

        Iterable<EventTicket> temp = eventTicketService.findEventTicketByParticipant(id);
        ArrayList<EventTicketDTO> result = new ArrayList<>();
        for (EventTicket eventTicket : temp) {
            result.add(getEventTicketDTOFromEventTicket(eventTicket));
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/hasParticipatedEvent/{participantId}/{eventId}")
    ResponseEntity<Boolean> getParticpationStatus(@PathVariable Integer participantId, @PathVariable Integer eventId){
        return ResponseEntity.ok(eventTicketService.existingTicket(participantId,eventId));
    }

    // Identify event ticket exists using eventId and userId
    @GetMapping(value = "/listParticipantTickets/{id}/{eventId}")
    public @ResponseBody
    ResponseEntity<ArrayList<EventTicketDTO>> getParticipantTickets(@PathVariable Integer id, @PathVariable Integer eventId) {
        if (eventTicketService.findSpecificTicket(id, eventId) == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No Ticket with Id: " + id + " and eventId: " + eventId);
        }

        Iterable<EventTicket> temp = eventTicketService.findSpecificTicket(id, eventId);
        ArrayList<EventTicketDTO> result = new ArrayList<>();
        for (EventTicket eventTicket : temp) {
            result.add(getEventTicketDTOFromEventTicket(eventTicket));
        }

        return ResponseEntity.ok(result);
    }

    @PostMapping("/new")
    public @ResponseBody
    ResponseEntity<EventTicketDTO> addTicket(@RequestParam Integer participantId,
                                             @RequestParam(required = false) Integer eventId,
                                             @RequestParam(required = false) String inviteCode) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (!userService.findByUsername(auth.getName()).getId().equals(participantId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        Event event;
        if (eventId == null) {
            event = eventService.findByInviteCode(inviteCode);
        } else if (inviteCode == null) {
            event = eventService.findById(eventId);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        if (event == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid event");
        }

        Participant participant = participantService.findById(participantId);
        if (participant == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No Participant with ID: " + eventId);
        }
        if (eventTicketService.existingTicket(participantId, eventId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Participant has already joined event.");
        }
        EventTicket ticket = new EventTicket();
        ticket.setEvent(event);
        ticket.setParticipant(participant);

        EventTicket created = eventTicketService.addTicket(ticket);

        // Send the Email
        Map<String, Object> formModel = new HashMap<>();
        formModel.put("recipientEmailAddress", created.getParticipant().getUser().getEmail());
        formModel.put("userName", created.getParticipant().getUser().getName());
        formModel.put("eventName", created.getEvent().getName());
        formModel.put("eventId", created.getEvent().getId());

        // Send an Email to the organiser to let them know they have successfully created the event
        try {
            emailUtil.sendEventSignUpEmail(formModel);
        }catch (Exception e){
            LOGGER.error(e.getMessage());
        }
      
        return ResponseEntity.ok(getEventTicketDTOFromEventTicket(created));
    }

    @DeleteMapping("/{id}")
    public @ResponseBody
    ResponseEntity<EventTicketDTO> deleteWithId(@PathVariable Integer id) {
        EventTicket toDel = eventTicketService.findById(id);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Integer authParticipantId = userService.findByUsername(username).getId();
        if (toDel == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No EventTicket with ID: " + id);
        }

        if (!toDel.getParticipant().getId().equals(authParticipantId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        EventTicket eventTicket = eventTicketService.deleteById(id);

        return ResponseEntity.ok(getEventTicketDTOFromEventTicket(eventTicket));
    }

    EventTicketDTO getEventTicketDTOFromEventTicket(EventTicket eventTicket){
        EventTicketDTO toRet = new EventTicketDTO();
        toRet.setId(eventTicket.getId());
        toRet.setParticipantName(eventTicket.getParticipant().getUser().getName());
        toRet.setParticipantId(eventTicket.getParticipant().getId());
        toRet.setIsVaccinated(eventTicket.getParticipant().getVaxStatus());
        toRet.setOrganiserName(eventTicket.getEvent().getOrganiser().getUser().getName());
        toRet.setOrganiserId(eventTicket.getEvent().getOrganiser().getId());
        toRet.setEventName(eventTicket.getEvent().getName());
        toRet.setEventId(eventTicket.getEvent().getId());
        toRet.setStartDateTime(eventTicket.getEvent().getStartDateTime());
        toRet.setEndDateTime(eventTicket.getEvent().getEndDateTime());
        toRet.setEventAddress(eventTicket.getEvent().getAddress());

        return toRet;
    }

    ArrayList<EventTicketDTO> getArrayListFromIterable(Iterable<EventTicket> temp){
        ArrayList<EventTicketDTO> result = new ArrayList<>();
        for (EventTicket eventTicket : temp) {
            result.add(getEventTicketDTOFromEventTicket(eventTicket));
        }
        return result;
    }

}
