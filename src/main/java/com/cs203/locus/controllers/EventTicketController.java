package com.cs203.locus.controllers;

import java.util.ArrayList;
import java.util.List;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventDTO;
import com.cs203.locus.models.event.EventTicket;
import com.cs203.locus.models.event.EventTicketDTO;
import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.user.User;
import com.cs203.locus.service.EventService;
import com.cs203.locus.service.EventTicketService;

import com.cs203.locus.service.ParticipantService;
import org.checkerframework.checker.units.qual.A;
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

    @Autowired
    private UserController userController;


//    public EventTicketController(EventTicketService ets){
//        this.eventTicketService = ets;
//    }
//    @GetMapping(value = "/list")
//    public @ResponseBody ResponseEntity<?> getEventTickets() {
//        Iterable<EventTicket> temp = eventTicketService.findAll();
//        ArrayList<EventTicketDTO> result = new ArrayList<>();
//        for (EventTicket eventTicket : temp) {
//            eventTicketDTO toRet = new eventTicketDTO();
//            toRet.setId(eventTicket.getId());
//            toRet.setName(eventTicket.getName());
//            toRet.setDescription(eventTicket.getDescription());
//            toRet.setAddress(eventTicket.getAddress());
//            toRet.setStartDateTime(eventTicket.getStartDateTime().toString());
//            toRet.setEndDateTime(eventTicket.getEndDateTime().toString());
//            toRet.setTag(eventTicket.getTag());
//            toRet.setOrganiserId(eventTicket.getOrganiser().getId());
//            result.add(toRet);
//        }
//        return ResponseEntity.ok(result);
//    }
    
    @GetMapping("/{id}")
    public @ResponseBody ResponseEntity<EventTicketDTO> findById(@PathVariable("id") Integer id){
        EventTicket result = eventTicketService.findById(id);
        EventTicketDTO toRet = new EventTicketDTO();
        toRet.setParticipantName(eventTicketService.findById(id).getParticipant().getUser().getName());
        toRet.setOrganiserName(eventTicketService.findById(id).getEvent().getOrganiser().getUser().getName());
        toRet.setEventName(eventTicketService.findById(id).getEvent().getName());
        toRet.setEventId(eventTicketService.findById(id).getEvent().getId());
        toRet.setStartDateTime(eventTicketService.findById(id).getEvent().getStartDateTime());
        toRet.setEndDateTime(eventTicketService.findById(id).getEvent().getEndDateTime());
        toRet.setEventAddress(eventTicketService.findById(id).getEvent().getAddress());

        return ResponseEntity.ok(toRet);
    }

    @GetMapping(value ="/listParticipantTickets")
    public @ResponseBody ResponseEntity<ArrayList<EventTicketDTO>> getAllTickets(Integer id){
        Iterable<EventTicket> temp = eventTicketService.findEventTicketByParticipant(id);
        ArrayList<EventTicketDTO> result = new ArrayList<>();
        for (EventTicket eventTicket : temp) {
            EventTicketDTO toRet = new EventTicketDTO();
            toRet.setParticipantName(eventTicketService.findById(id).getParticipant().getUser().getName());
            toRet.setOrganiserName(eventTicketService.findById(id).getEvent().getOrganiser().getUser().getName());
            toRet.setEventName(eventTicketService.findById(id).getEvent().getName());
            toRet.setEventId(eventTicketService.findById(id).getEvent().getId());
            toRet.setStartDateTime(eventTicketService.findById(id).getEvent().getStartDateTime());
            toRet.setEndDateTime(eventTicketService.findById(id).getEvent().getEndDateTime());
            toRet.setEventAddress(eventTicketService.findById(id).getEvent().getAddress());
            result.add(toRet);
        }

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
