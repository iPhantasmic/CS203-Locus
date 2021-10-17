package com.cs203.locus.controllers;

import java.util.ArrayList;

import com.cs203.locus.models.event.EventTicket;
import com.cs203.locus.models.event.EventTicketDTO;
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

    // TODO: ensure only participant can create an EventTicket for himself
    @PostMapping("/new")
    public EventTicket addTicket(@RequestParam Integer participantId, @RequestParam Integer eventId) {
        EventTicket ticket = new EventTicket();
        ticket.setEvent(eventService.findById(eventId));
        ticket.setParticipant(participantService.findById(participantId));

        return eventTicketService.addTicket(ticket);
    }

    // TODO: ensure only participant can delete own EventTicket
    @DeleteMapping("/{id}")
    public @ResponseBody ResponseEntity<EventTicket> deleteWithId(@PathVariable Integer id) {
        EventTicket result = eventTicketService.deleteById(id);

        return ResponseEntity.ok(result);
    }

}
