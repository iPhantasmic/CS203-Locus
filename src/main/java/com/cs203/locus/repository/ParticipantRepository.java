package com.cs203.locus.repository;

import com.cs203.locus.models.participant.Participant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantRepository extends CrudRepository<Participant, Integer>{

}



