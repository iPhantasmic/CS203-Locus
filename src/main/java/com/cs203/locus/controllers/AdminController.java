package com.cs203.locus.controllers;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.participant.ParticipantDTO;
import com.cs203.locus.models.participant.ParticipantVaxDTO;
import com.cs203.locus.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    ParticipantService participantService;

    @GetMapping(value = "/all-verification")
//    @PreAuthorize("hasRole('ADMIN')")
    public @ResponseBody
    ResponseEntity<List<ParticipantVaxDTO>> getAllVerification() {
        List<ParticipantVaxDTO> result = participantService.findAllVerification();

        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/pending-verification")
//    @PreAuthorize("hasRole('ADMIN')")
    public @ResponseBody
    ResponseEntity<List<ParticipantVaxDTO>> getPendingVerification() {
        List<ParticipantVaxDTO> result = participantService.findByPendingVerification();

        return ResponseEntity.ok(result);
    }

    @PutMapping(path = "/verification/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
    public @ResponseBody
    ResponseEntity<ParticipantDTO> acceptVerification(@PathVariable Integer id, @RequestParam boolean isVerified) {
        Participant updated = null;
        if (isVerified) {
            updated = participantService.verifyParticipant(id);
        } else if (!isVerified) {
            updated = participantService.rejectParticipant(id);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        if (updated == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid Participant ID");
        }

        ParticipantDTO toRet = new ParticipantDTO();
        toRet.setId(updated.getId());
        toRet.setVaxStatus(updated.getVaxStatus());
        toRet.setVaxGcsUrl(updated.getVaxGcsUrl());

        return ResponseEntity.ok(toRet);
    }

    @PostMapping(path = "/news")
    public @ResponseBody
    ResponseEntity<?> createNews() {
        
    }
}
