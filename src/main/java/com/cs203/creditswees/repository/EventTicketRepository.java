package com.cs203.creditswees.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import javax.transaction.Transactional;

import com.cs203.creditswees.models.Event.EventTicket;

//TODO: Other functions (Adding, finding)
@Repository
public interface EventTicketRepository extends CrudRepository<EventTicket, Integer> {
    

    @Transactional
    void deleteById(int ID);

    EventTicket findById(int ID);

    List<EventTicket> findAll();

}