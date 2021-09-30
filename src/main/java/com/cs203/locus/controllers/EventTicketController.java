package com.cs203.locus.controllers;

import java.util.List;

import com.cs203.locus.models.event.EventTicket;
import com.cs203.locus.service.EventTicketService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;



//TODO: Remaining PUT method
@RestController
public class EventTicketController {

    @Autowired
    private EventTicketService eventTicketService;

    public EventTicketController(EventTicketService ets){
        this.eventTicketService = ets;
    }
    
    @GetMapping("/ticket/{id}")
    public @ResponseBody ResponseEntity<EventTicket> findById(@PathVariable("id") Integer id){
        EventTicket result = eventTicketService.findById(id);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/ticket")
    public @ResponseBody ResponseEntity<List<EventTicket>> findAll(){
        List<EventTicket> results = eventTicketService.findAll();

        return ResponseEntity.ok(results);
    }

    @PostMapping("/ticket")
    public EventTicket addTicket(@RequestBody EventTicket ticket){
        return eventTicketService.addTicket(ticket);
    }

    @DeleteMapping("/ticket/{id}")
    public @ResponseBody ResponseEntity<?> deleteWithId(@PathVariable("id") Integer id) {
        EventTicket result = eventTicketService.deleteById(id);
        return ResponseEntity.ok(result);
    }
}
