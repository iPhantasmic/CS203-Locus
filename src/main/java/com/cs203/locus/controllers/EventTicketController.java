package com.cs203.locus.controllers;

import java.util.ArrayList;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventTicket;
import com.cs203.locus.models.event.EventTicketDTO;
import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.service.EventService;
import com.cs203.locus.service.EventTicketService;

import com.cs203.locus.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


//TODO: Remaining PUT method
@RestController
@RequestMapping("/ticket")
public class EventTicketController {

    @Autowired
    private EventTicketService eventTicketService;

    @Autowired
    private EventService eventService;

    @Autowired
    private ParticipantService participantService;


    // TODO: is this needed?
    @GetMapping(value = "/list")
    public @ResponseBody ResponseEntity<?> getAllEventTickets() {
        Iterable<EventTicket> temp = eventTicketService.findAll();
        ArrayList<EventTicketDTO> result = new ArrayList<>();
        for (EventTicket eventTicket : temp) {
            EventTicketDTO toRet = new EventTicketDTO();
            toRet.setId(eventTicket.getId());
            toRet.setParticipantName(eventTicket.getParticipant().getUser().getName());
            toRet.setParticipantId(eventTicket.getParticipant().getId());
            toRet.setOrganiserId(eventTicket.getEvent().getOrganiser().getId());
            toRet.setOrganiserName(eventTicket.getEvent().getOrganiser().getUser().getName());
            toRet.setEventName(eventTicket.getEvent().getName());
            toRet.setEventId(eventTicket.getEvent().getId());
            toRet.setStartDateTime(eventTicket.getEvent().getStartDateTime());
            toRet.setEndDateTime(eventTicket.getEvent().getEndDateTime());
            toRet.setEventAddress(eventTicket.getEvent().getAddress());
            result.add(toRet);
        }

        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/{id}")
    public @ResponseBody ResponseEntity<EventTicketDTO> findById(@PathVariable Integer id){
        EventTicket result = eventTicketService.findById(id);

        if (result == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No EventTicket with ID: " + id);
        }

        EventTicketDTO toRet = new EventTicketDTO();
        toRet.setParticipantName(result.getParticipant().getUser().getName());
        toRet.setOrganiserName(result.getEvent().getOrganiser().getUser().getName());
        toRet.setEventName(result.getEvent().getName());
        toRet.setEventId(result.getEvent().getId());
        toRet.setStartDateTime(result.getEvent().getStartDateTime());
        toRet.setEndDateTime(result.getEvent().getEndDateTime());
        toRet.setEventAddress(result.getEvent().getAddress());

        return ResponseEntity.ok(toRet);
    }

    // TODO: ensure participant can only access his own list of EventTickets
    @GetMapping(value ="/listParticipantTickets/{id}")
    public @ResponseBody ResponseEntity<ArrayList<EventTicketDTO>> getParticipantTickets(@PathVariable Integer id){
        if (participantService.findById(id) == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No Participant with ID: " + id);
        }

        Iterable<EventTicket> temp = eventTicketService.findEventTicketByParticipant(id);
        ArrayList<EventTicketDTO> result = new ArrayList<>();
        for (EventTicket eventTicket : temp) {
            EventTicketDTO toRet = new EventTicketDTO();
            toRet.setId(eventTicket.getId());
            toRet.setParticipantName(eventTicket.getParticipant().getUser().getName());
            toRet.setParticipantId(eventTicket.getParticipant().getId());
            toRet.setOrganiserName(eventTicket.getEvent().getOrganiser().getUser().getName());
            toRet.setOrganiserId(eventTicket.getEvent().getOrganiser().getId());
            toRet.setEventName(eventTicket.getEvent().getName());
            toRet.setEventId(eventTicket.getEvent().getId());
            toRet.setStartDateTime(eventTicket.getEvent().getStartDateTime());
            toRet.setEndDateTime(eventTicket.getEvent().getEndDateTime());
            toRet.setEventAddress(eventTicket.getEvent().getAddress());
            result.add(toRet);
        }

        return ResponseEntity.ok(result);
    }

    // Identify event ticket exists using eventId and userId
    @GetMapping(value ="/listParticipantTickets/{id}/{eventId}")
    public @ResponseBody ResponseEntity<ArrayList<EventTicketDTO>> getParticipantTickets(@PathVariable Integer id, @PathVariable Integer eventId){
        if (eventTicketService.findSpecificTicket(id, eventId) == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No Ticket with Id: " + id + " and eventId: " + eventId);
        }

        Iterable<EventTicket> temp = eventTicketService.findSpecificTicket(id, eventId);
        ArrayList<EventTicketDTO> result = new ArrayList<>();
        for (EventTicket eventTicket : temp) {
            EventTicketDTO toRet = new EventTicketDTO();
            toRet.setId(eventTicket.getId());
            toRet.setParticipantName(eventTicket.getParticipant().getUser().getName());
            toRet.setParticipantId(eventTicket.getParticipant().getId());
            toRet.setOrganiserName(eventTicket.getEvent().getOrganiser().getUser().getName());
            toRet.setOrganiserId(eventTicket.getEvent().getOrganiser().getId());
            toRet.setEventName(eventTicket.getEvent().getName());
            toRet.setEventId(eventTicket.getEvent().getId());
            toRet.setStartDateTime(eventTicket.getEvent().getStartDateTime());
            toRet.setEndDateTime(eventTicket.getEvent().getEndDateTime());
            toRet.setEventAddress(eventTicket.getEvent().getAddress());
            result.add(toRet);
        }

        return ResponseEntity.ok(result);
    }

    // TODO: ensure only participant can create an EventTicket for himself
    @PostMapping("/new")

    public @ResponseBody ResponseEntity<EventTicketDTO> addTicket(@RequestParam Integer participantId, @RequestParam Integer eventId) {

        Event event = eventService.findById(eventId);
        if (event == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No Event with ID: " + eventId);
        }

        Participant participant = participantService.findById(participantId);
        if (participant == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No Participant with ID: " + eventId);
        }

        EventTicket ticket = new EventTicket();
        ticket.setEvent(event);
        ticket.setParticipant(participant);

        EventTicket created = eventTicketService.addTicket(ticket);
        EventTicketDTO toRet = new EventTicketDTO();
        toRet.setId(created.getId());
        toRet.setParticipantName(created.getParticipant().getUser().getName());
        toRet.setParticipantId(created.getParticipant().getId());
        toRet.setOrganiserName(created.getEvent().getOrganiser().getUser().getName());
        toRet.setOrganiserId(created.getEvent().getOrganiser().getId());
        toRet.setEventName(created.getEvent().getName());
        toRet.setEventId(created.getEvent().getId());
        toRet.setStartDateTime(created.getEvent().getStartDateTime());
        toRet.setEndDateTime(created.getEvent().getEndDateTime());
        toRet.setEventAddress(created.getEvent().getAddress());

        return ResponseEntity.ok(toRet);
    }

    // TODO: ensure only participant can delete own EventTicket
    @DeleteMapping("/{id}")
    public @ResponseBody ResponseEntity<EventTicket> deleteWithId(@PathVariable Integer id) {
        EventTicket result = eventTicketService.deleteById(id);
        if (result == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No EventTicket with ID: " + id);
        }

        return ResponseEntity.ok(result);
    }

}
