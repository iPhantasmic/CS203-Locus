package com.cs203.locus.controllers;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.participant.ParticipantDTO;
import com.cs203.locus.service.ParticipantService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/participant")
public class ParticipantController {

    @Autowired
    public ParticipantService participantService;

    @GetMapping(value = "/{id}")
    public @ResponseBody
    ResponseEntity<Participant> getParticipant(@PathVariable Integer id) {
        Participant result = participantService.findById(id);

        return ResponseEntity.ok(result);
    }

    @PutMapping(path = "/{id}")
    public @ResponseBody ResponseEntity<Participant> updateEvent(@PathVariable Integer id, @Valid @RequestBody ParticipantDTO participantDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // TODO: handle various bad input
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Participant Information Fields");
        }

        Participant updated = participantService.updateParticipant(id, participantDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping(path = "/{id}")
    public @ResponseBody ResponseEntity<Participant> deleteEvent(@PathVariable Integer id) {
        Participant deleted = participantService.deleteParticipant(id);

        return ResponseEntity.ok(deleted);
    }

    @GetMapping(value = "/pending-verification")
    public @ResponseBody ResponseEntity<List<ParticipantDTO>> getPendingVerification() {
        List<ParticipantDTO> result = participantService.findByPendingVerification();
        return ResponseEntity.ok(result);
    }

    @PutMapping(path = "/accepted-verification/{id}")
    public @ResponseBody ResponseEntity<Participant> updateStatus(@PathVariable Integer id) {
        Participant updated = participantService.verifyParticipant(id);
        return ResponseEntity.ok(updated);
    }


    // TODO: get all participants for particular event

}
