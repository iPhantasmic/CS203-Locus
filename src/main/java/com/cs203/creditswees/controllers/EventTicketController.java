package com.cs203.creditswees.controllers;

import com.cs203.creditswees.service.EventTicketService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventTicketController {
    private EventTicketService eventTicketService;

    public EventTicketController(EventTicketService ets){
        this.eventTicketService = ets;
    }

    //TODO: Change to return type to void after backend structure is up
    @DeleteMapping("/ticket")
    public @ResponseBody ResponseEntity<?> test1() {
        eventTicketService.deleteById(5);
        return ResponseEntity.ok("First API!");
    }

}
