package com.cs203.locus.repository;

import com.cs203.locus.models.event.Event;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
//import javax.transaction.Transactional;
import com.cs203.locus.models.event.EventTicket;

@Repository
public interface EventTicketRepository extends CrudRepository<EventTicket, Integer> {

    // get all eventTickets using participantId
    @Query("SELECT a FROM EventTicket a WHERE a.participant.id = :id")
    List<EventTicket> findByParticipantId(Integer id);

    // get specific eventTicket using participantId and eventId
    @Query("SELECT a FROM EventTicket a WHERE a.participant.id = :id AND a.event.id = :eventId")
    List<EventTicket> findByParticipantIdAndEvent(Integer id, Integer eventId);

    @Query("SELECT a from EventTicket a WHERE a.event.id = :eventId")
    List<EventTicket> findEventTicketByEventId(Integer eventId);
}


