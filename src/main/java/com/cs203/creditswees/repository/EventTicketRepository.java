package com.cs203.creditswees.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
//import javax.transaction.Transactional;
import com.cs203.creditswees.models.event.EventTicket;

@Repository
public interface EventTicketRepository extends CrudRepository<EventTicket, Integer> {
    List<EventTicket> findAll();
}