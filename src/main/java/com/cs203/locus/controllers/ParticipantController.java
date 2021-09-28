package com.cs203.locus.controllers;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.participant.ParticipantDTO;
import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventDTO;
import com.cs203.locus.service.EventService;
import com.cs203.locus.service.EventTicketService;
import com.cs203.locus.service.OrganiserService;

import java.util.*;

import com.cs203.locus.models.event.EventTicket;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/participant")
public class ParticipantController {
    
    @Autowired
    public ParticipantController participantController;

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    
    //get participant profile

    //update url


    













    @GetMapping(value = "/{username}")
//    @PreAuthorize("hasRole('ADMIN') or #username == authentication.name")
    public @ResponseBody
    ResponseEntity<ParticipantDTO> getUser(@PathVariable String username) {
        Participant participant = participant.findByUsername(username);
        // Only occurs if user is deleted and attempts to use his token to access the deleted account
        

        ParticipantDTO ParticipantDTO = new ParticipantDTO();
        ParticipantDTO.setUrl(ParticipantDTO.getUrl());
        ParticipantDTO.setVaxStatus( ParticipantDTO.getVaxStatus());
        

        return ResponseEntity.ok(ParticipantDTO);
    }
    

}
