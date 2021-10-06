package com.cs203.locus.repository;

import com.cs203.locus.models.event.Event;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
//import javax.transaction.Transactional;
import com.cs203.locus.models.event.EventTicket;

@Repository
public interface EventTicketRepository extends CrudRepository<EventTicket, Integer> {
    Iterable<EventTicket> findEventTicketByParticipant_Id(Integer id);
}