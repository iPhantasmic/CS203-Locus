package com.cs203.locus.controllers;

import java.util.ArrayList;
import java.util.List;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventDTO;
import com.cs203.locus.models.event.EventTicket;
import com.cs203.locus.models.event.EventTicketDTO;
import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.service.EventService;
import com.cs203.locus.service.EventTicketService;

import com.cs203.locus.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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

    public EventTicketController(EventTicketService ets){
        this.eventTicketService = ets;
    }
    
    @GetMapping("/{id}")
    public @ResponseBody ResponseEntity<EventTicket> findById(@PathVariable("id") Integer id){
        EventTicket result = eventTicketService.findById(id);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/new")
    public EventTicket addTicket(Integer participantId, Integer eventId){
        EventTicket ticket = new EventTicket();
        ticket.setEvent(eventService.findById(eventId));
        ticket.setParticipant(participantService.findById(participantId));
        return eventTicketService.addTicket(ticket);
    }

    @DeleteMapping("/{id}")
    public @ResponseBody ResponseEntity<?> deleteWithId(@PathVariable("id") Integer id) {
        EventTicket result = eventTicketService.deleteById(id);
        return ResponseEntity.ok(result);
    }
}
