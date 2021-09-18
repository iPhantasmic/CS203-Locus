package com.cs203.creditswees.repository;

import com.cs203.creditswees.models.event.Event;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

//import javax.transaction.Transactional;

@Repository
public interface EventRepository extends CrudRepository<Event, Integer> {

}