package com.cs203.locus.controllers;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.participant.ParticipantDTO;
import com.cs203.locus.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.ArrayList;


@RestController
@RequestMapping("/participant")
public class ParticipantController {

    @Autowired
    public ParticipantService participantService;

    // get Participant from id
    @GetMapping(value = "/{id}")
    public @ResponseBody
    ResponseEntity<ParticipantDTO> getParticipant(@PathVariable Integer id) {
        Participant result = participantService.findById(id);
        ParticipantDTO toRet = new ParticipantDTO();
        toRet.setId(result.getId());
        toRet.setVaxGcsUrl(result.getVaxGcsUrl());
        toRet.setVaxStatus(result.getVaxStatus());

        return ResponseEntity.ok(toRet);
    }

    // get all participants
    @GetMapping(value = "/list")
    public @ResponseBody
    ResponseEntity<?> getAllParticipants() {
        Iterable<Participant> temp = participantService.findAll();
        ArrayList<ParticipantDTO> result = new ArrayList<>();
        for (Participant participant : temp) {
            ParticipantDTO toRet = new ParticipantDTO();
            toRet.setId(participant.getId());
            toRet.setVaxGcsUrl(participant.getVaxGcsUrl());
            toRet.setVaxStatus(participant.getVaxStatus());

            result.add(toRet);
        }
        return ResponseEntity.ok(result);
    }

    @PutMapping(path = "/{id}")
    public @ResponseBody
    ResponseEntity<Participant> updateParticipant(@PathVariable Integer id, @Valid @RequestBody ParticipantDTO participantDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // TODO: handle various bad input
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Participant Information Fields");
        }

        Participant updated = participantService.updateParticipant(id, participantDTO);
        return ResponseEntity.ok(updated);
    }

}
