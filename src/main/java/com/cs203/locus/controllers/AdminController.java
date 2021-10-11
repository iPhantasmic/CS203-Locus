package com.cs203.locus.controllers;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.participant.ParticipantVaxDTO;
import com.cs203.locus.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    ParticipantService participantService;

    @GetMapping(value = "/all-verification")
    public @ResponseBody ResponseEntity<List<ParticipantVaxDTO>> getAllVerification() {
        List<ParticipantVaxDTO> result = participantService.findAllVerification();

        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/pending-verification")
    public @ResponseBody ResponseEntity<List<ParticipantVaxDTO>> getPendingVerification() {
        List<ParticipantVaxDTO> result = participantService.findByPendingVerification();

        return ResponseEntity.ok(result);
    }

    @PutMapping(path = "/accepted-verification/{id}")
    public @ResponseBody ResponseEntity<Participant> acceptVerification(@PathVariable Integer id) {
        Participant updated = participantService.verifyParticipant(id);
        return ResponseEntity.ok(updated);
    }

    @PutMapping(path = "/rejected-verification/{id}")
    public @ResponseBody ResponseEntity<Participant> rejectVerification(@PathVariable Integer id) {
        Participant updated = participantService.rejectParticipant(id);
        return ResponseEntity.ok(updated);
    }
}
