package com.cs203.locus.repository;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.participant.ParticipantVaxDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipantRepository extends CrudRepository<Participant, Integer>{

    @Query("SELECT new com.cs203.locus.models.participant.ParticipantVaxDTO(u.id, u.name, p.vaxStatus, p.vaxGcsUrl, u.emailVerified, u.email, u.createAt, u.updateAt) FROM User u INNER JOIN Participant p ON u.id = p.id WHERE p.vaxStatus = false AND p.vaxGcsUrl IS NOT NULL")
    List<ParticipantVaxDTO> findAllPendingVerifications();

    @Query("SELECT new com.cs203.locus.models.participant.ParticipantVaxDTO(u.id, u.name, p.vaxStatus, p.vaxGcsUrl, u.emailVerified, u.email, u.createAt, u.updateAt) FROM User u INNER JOIN Participant p ON u.id = p.id")
    List<ParticipantVaxDTO> findAllVerification();
}



