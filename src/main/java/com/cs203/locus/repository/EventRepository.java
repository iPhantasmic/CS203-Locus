package com.cs203.locus.repository;

import java.util.List;
import com.cs203.locus.models.event.Event;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends CrudRepository<Event, Integer> {
    @Query(value = "SELECT * FROM event a WHERE a.organiser_id = :id", nativeQuery = true)
    List<Event> findByOrganiserId(Integer id);

    List<Event> findByIsPrivateTrue();

    Event findByInviteCode(String code);
}