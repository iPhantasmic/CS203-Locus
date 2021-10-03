package com.cs203.locus.service;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.participant.ParticipantDTO;
import com.cs203.locus.repository.ParticipantRepository;

import com.cs203.locus.repository.UserRepository;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import javax.transaction.UserTransaction;
import java.util.ArrayList;
import java.util.List;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private UserRepository userRepository;

    public Participant findById(Integer id){
        if (participantRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No Participant with ID: " + id);
        }
        return participantRepository.findById(id).get();
    }

    // TODO: Fix Participant DTO
    public List<ParticipantDTO> findByPendingVerification(){
        List<Participant> result = participantRepository.FindAllWithDescriptionQuery();
        List<ParticipantDTO> output = new ArrayList<>();
        for (Participant participant: result) {
            ParticipantDTO dto = new ParticipantDTO(participant.getId(), "Hello world", participant.getVaxStatus(), participant.getVaxGcsUrl());
            output.add(dto);
        }
        return output;
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

    public Participant verifyParticipant(Integer id) {
        Participant participant = participantRepository.findById(id).orElseThrow();
        participant.setVaxStatus(true);
        return participantRepository.save(participant);
    }

    // TODO: get all events that a participant is participating in

}
