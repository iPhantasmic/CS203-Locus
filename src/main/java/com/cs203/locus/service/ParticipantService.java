package com.cs203.locus.service;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.organiser.Organiser;
import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.participant.ParticipantVaxDTO;
import com.cs203.locus.repository.EventTicketRepository;
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
import java.util.Objects;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private EventTicketRepository eventTicketRepository;

    @Autowired
    private EventTicketService eventTicketService;
    
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

    // find all Organisers
    public Iterable<Participant> findAll() {
        return participantRepository.findAll();
    }

    // TODO: Fix Participant DTO
    public List<ParticipantVaxDTO> findByPendingVerification(){
        List<Participant> result = participantRepository.FindAllWithDescriptionQuery();
        List<ParticipantVaxDTO> output = new ArrayList<>();
        for (Participant participant: result) {
            String name = Objects.requireNonNull(userRepository.findById(participant.getId()).orElse(null)).getName();
            ParticipantVaxDTO dto = new ParticipantVaxDTO(participant.getId(), name, participant.getVaxStatus(), participant.getVaxGcsUrl());
            output.add(dto);
        }
        return output;
    }

    public Participant createParticipant(Participant participant){
        return participantRepository.save(participant);
    }

    public Participant updateParticipant(Integer id, ParticipantVaxDTO participantDTO){
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

    // TODO: get all events that a participant is participating in

}
