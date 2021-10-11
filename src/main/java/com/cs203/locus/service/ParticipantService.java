package com.cs203.locus.service;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.participant.ParticipantDTO;
import com.cs203.locus.models.participant.ParticipantVaxDTO;
import com.cs203.locus.repository.ParticipantRepository;
import com.cs203.locus.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;

    
    @Autowired
    private UserRepository userRepository;

    // find Participant by Id
    public Participant findById(Integer id){
        if (participantRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No Participant with ID: " + id);
        }
        return participantRepository.findById(id).get();
    }

    // find all Participants
    public Iterable<Participant> findAll() {
        return participantRepository.findAll();
    }

    // TODO: Fix ParticipantVaxDTO
    public List<ParticipantVaxDTO> findByPendingVerification(){
        return participantRepository.findAllPendingVerifications();
    }

    public List<ParticipantVaxDTO> findAllVerification(){
        return participantRepository.findAllVerification();
    }

    public Participant createParticipant(Participant participant){
        return participantRepository.save(participant);
    }

    public Participant updateParticipant(Integer id, ParticipantDTO participantDTO){
        if (participantRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No Participant with ID: " + id);
        }
        Participant newParticipant = participantRepository.findById(id).get();
        newParticipant.setVaxGcsUrl(participantDTO.getVaxGcsUrl());
        newParticipant.setVaxStatus(participantDTO.getVaxStatus());
        return participantRepository.save(newParticipant);
    }

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

    public Participant updateVaxGcsUrl(Integer id, String url) {
        Optional<Participant> participant = participantRepository.findById(id);
        Participant participant1 = participant.orElse(null);
        if (participant1 == null) {
            return null;
        }
        participant1.setVaxGcsUrl(url);
        return participantRepository.save(participant1);
    }

    public Participant verifyParticipant(Integer id) {
        Participant participant = participantRepository.findById(id).orElse(null);
        if (participant == null) {
            return null;
        }
        participant.setVaxStatus(true);
        participantRepository.save(participant);
        return participant;
    }

    public Participant rejectParticipant(Integer id) {
        Participant participant = participantRepository.findById(id).orElse(null);
        if (participant == null) {
            return null;
        }
        participant.setVaxStatus(false);
        participant.setVaxGcsUrl(null);
        participantRepository.save(participant);
        return participant;
    }


}
