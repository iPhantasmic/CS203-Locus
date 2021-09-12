package com.cs203.creditswees.controllers;

import java.security.interfaces.EdECKey;
import java.util.ArrayList;
import java.util.List;

import com.cs203.creditswees.models.Event.EventTicket;
import com.cs203.creditswees.service.EventTicketService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;



//TODO: Remaining PUT method
@RestController
public class EventTicketController {
    private EventTicketService eventTicketService;

    public EventTicketController(EventTicketService ets){
        this.eventTicketService = ets;
    }
    
    @GetMapping("/ticket")
    public List<EventTicket> findAll(@RequestParam(required = false) Integer id){
        if (id == null){
            return eventTicketService.findAll();
        }
        ArrayList<EventTicket> result = new ArrayList<>();
        result.add(eventTicketService.findbyId(id));
        return result;
    }

    @PostMapping("/ticket")
    public EventTicket addTicket(@RequestBody EventTicket ticket){
        return eventTicketService.addTicket(ticket);
    }


    //TODO: Change to return type to void after backend structure is up and include parameters
    @DeleteMapping("/ticket")
    public @ResponseBody ResponseEntity<?> deleteWithId() {
        eventTicketService.deleteById(5);
        return ResponseEntity.ok("First API!");
    }

}
