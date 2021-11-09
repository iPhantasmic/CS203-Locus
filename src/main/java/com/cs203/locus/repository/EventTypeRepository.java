package com.cs203.locus.repository;

import com.cs203.locus.models.eventtype.EventType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventTypeRepository extends CrudRepository<EventType, Integer> {
    EventType findByType(String type);
}