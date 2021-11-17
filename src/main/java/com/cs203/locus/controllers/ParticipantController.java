package com.cs203.locus.controllers;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.participant.ParticipantDTO;
import com.cs203.locus.service.ParticipantService;
import com.cs203.locus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;


@RestController
@RequestMapping("/participant")
public class ParticipantController {

    @Autowired
    public ParticipantService participantService;

    @Autowired
    public UserService userService;

    // get Participant from id
    @GetMapping(value = "/{id}")
    public @ResponseBody
    ResponseEntity<ParticipantDTO> getParticipant(@PathVariable Integer id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // We only allow Admin or the User itself. Hence, if not both, give 403 Forbidden
        if (!auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))
                && !userService.findByUsername(auth.getName()).getId().equals(id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        Participant result = participantService.findById(id);

        return ResponseEntity.ok(getParticipantDTOFromParticipant(result));
    }

    // get all participants
    @GetMapping(value = "/list")
    @PreAuthorize("hasRole('ADMIN')")
    public @ResponseBody
    ResponseEntity<?> getAllParticipants() {
        Iterable<Participant> temp = participantService.findAll();
        ArrayList<ParticipantDTO> result = new ArrayList<>();
        for (Participant participant : temp) {
            result.add(getParticipantDTOFromParticipant(participant));
        }
        return ResponseEntity.ok(result);
    }

    ParticipantDTO getParticipantDTOFromParticipant(Participant result){
        ParticipantDTO toRet = new ParticipantDTO();
        toRet.setId(result.getId());
        toRet.setVaxGcsUrl(result.getVaxGcsUrl());
        toRet.setVaxStatus(result.getVaxStatus());

        return toRet;
    }
}
