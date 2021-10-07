package com.cs203.locus.service;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventDTO;
import com.cs203.locus.models.event.EventTicket;
import com.cs203.locus.repository.EventTicketRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;


@Service
public class EventTicketService {

    @Autowired
    private EventTicketRepository eventTickets;

    public EventTicketService(EventTicketRepository eventTickets){
        this.eventTickets = eventTickets;
    }



    public EventTicket findById (Integer id){
        if (eventTickets.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No event with ID: " + id);
        }

        return eventTickets.findById(id).get();
    }

    public EventTicket addTicket(EventTicket ticket){
        return eventTickets.save(ticket)    ;
    }

    public Iterable<EventTicket> findAll(){
        return eventTickets.findAll();
    }

    public Iterable<EventTicket> findEventTicketByParticipant(Integer id) {
        return eventTickets.findEventTicketByParticipant_Id(id);
    }



    @Transactional
    public EventTicket deleteById(Integer id){
        if (eventTickets.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No EventTicket with ID: " + id);
        }

        EventTicket current = eventTickets.findById(id).get();
        eventTickets.delete(current);
        return current;
    }
}