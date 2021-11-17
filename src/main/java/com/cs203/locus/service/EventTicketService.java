package com.cs203.locus.service;

import com.cs203.locus.models.event.EventTicket;
import com.cs203.locus.repository.EventTicketRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service
public class EventTicketService {

    @Autowired
    private EventTicketRepository eventTickets;

    // Get all EventTickets
    public Iterable<EventTicket> findAll(){
        return eventTickets.findAll();
    }

    // Get EventTicket using UserId and EventId

    public Iterable<EventTicket> findSpecificTicket(Integer id, Integer eventId){ return eventTickets.findByParticipantIdAndEvent(id, eventId); }

    // check if EventTicket exists using UserId and EventId
     public boolean existingTicket(Integer id, Integer eventId) {
         return eventTickets.findByParticipantIdAndEvent(id, eventId).size()!=0;
    }

    // Get a particular EventTicket
    public EventTicket findById (Integer id){
        Optional<EventTicket> result = eventTickets.findById(id);
        if (result.isEmpty()) {
            return null;
        }

        return result.get();
    }

    // Create a new EventTicket
    public EventTicket addTicket(EventTicket ticket){
        return eventTickets.save(ticket);
    }

    // Get all EventTickets for a particular user
    public List<EventTicket> findEventTicketByParticipant(Integer id) {
        return eventTickets.findByParticipantId(id);
    }

    // Get all EventTickets for a particular event
    public List<EventTicket> findEventTicketByEventId(Integer id){return  eventTickets.findEventTicketByEventId(id);}

    // Delete an EventTicket
    @Transactional
    public EventTicket deleteById(Integer id){
        Optional<EventTicket> result = eventTickets.findById(id);
        if (result.isEmpty()) {
            return null;
        }

        EventTicket current = result.get();
        eventTickets.delete(current);
        return current;
    }
}