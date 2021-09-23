package com.cs203.creditswees.service;


import java.util.List;

import com.cs203.creditswees.models.Event.EventTicket;
import com.cs203.creditswees.repository.EventTicketRepository;

import org.springframework.stereotype.Service;


@Service
public class EventTicketService {
   
    private EventTicketRepository eventTickets;
    

    public EventTicketService(EventTicketRepository eventTickets){
        this.eventTickets = eventTickets;
    }

    public EventTicket findbyId (Integer id){
        //eventTickets.findById(id);
        return new EventTicket(1,1,1);
    }

    public EventTicket addTicket(EventTicket ticket){
        return eventTickets.save(ticket);
    }

    public List<EventTicket> findAll(){
        return eventTickets.findAll();
    }

    public void deleteById(Integer id){
        // eventTickets.deleteById(id);
        System.out.println("hello");
    }
}