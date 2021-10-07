package com.cs203.locus.repository;

import com.cs203.locus.models.participant.Participant;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipantRepository extends CrudRepository<Participant, Integer>{
    @Query(nativeQuery = true, value = "SELECT user.id, name, vax_status, vax_gcs_url FROM user INNER JOIN participant WHERE user.id = participant.id AND vax_status = false AND participant.vax_gcs_url IS NOT NULL")
    List<Participant> FindAllWithDescriptionQuery();
}



