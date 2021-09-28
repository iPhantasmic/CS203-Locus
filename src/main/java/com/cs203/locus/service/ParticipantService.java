package com.cs203.locus.service;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.participant.ParticipantDTO;
import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.user.User;
import com.cs203.locus.repository.OrganiserRepository;
import com.cs203.locus.repository.ParticipantRepository;
import com.cs203.locus.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import javax.transaction.Transactional;

@Service
public class ParticipantService {
    
    final ParticipantRepository participantRepository;

    final UserRepository userRepository;

    public ParticipantService(ParticipantRepository participantRepository, UserRepository userRepository){
        this.participantRepository = participantRepository;
        this.userRepository = userRepository;
    }

    public Participant findById(Integer id){
        if (participantRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No Participant with ID: " + id);
        }
        return participantRepository.findById(id).get();
    }

    // i have no idea if this is needed
    public Participant findByUserId(Integer id){
        if (userRepository.findById(id).isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No Participant associated with UserID: " + id);
        }
        
        // why does this work??
        User user = userRepository.findById(id).get();

        // Review needed, not sure if this is right
        return user.getParticipantProfile();
    }

    public Participant createParticipant(ParticipantDTO participantDTO){
        Participant newParticipant = new Participant();

        newParticipant.setVaxAwsUrl(participantDTO.getVaxAwsUrl());
        newParticipant.setVaxStatus(participantDTO.getVaxStatus());
        
        // is a getUser method necessary in the organiserDTO class?
      
        return newParticipant;
    }

    public Participant updateParticipant(Integer id, ParticipantDTO participantDTO){
        if (participantRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No Participant with ID: " + id);
        }
        Participant newParticipant = participantRepository.findById(id).get();
        newParticipant.setVaxAwsUrl(participantDTO.getVaxAwsUrl());
        newParticipant.setVaxStatus(participantDTO.getVaxStatus());
        return participantRepository.save(newParticipant);
    }

    // need to add more methods?
    @Transactional
    public Participant deleteParticipant(Integer id) {
        if (participantRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No Participant with ID: " + id);
        }

        Participant current = participantRepository.findById(id).get();
        participantRepository.delete(current);
        return current;
    }
}
