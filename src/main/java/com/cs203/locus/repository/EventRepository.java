package com.cs203.locus.repository;
import java.util.List;
import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.organiser.Organiser;
import com.cs203.locus.models.participant.Participant;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

//import javax.transaction.Transactional;

@Repository
public interface EventRepository extends CrudRepository<Event, Integer> {
    @Query("SELECT a FROM Event a WHERE a.organiser.id = :id")
    List<Event> findByOrganiserId(Integer id);
}