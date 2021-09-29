package com.cs203.locus.controllers;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.participant.ParticipantDTO;
import com.cs203.locus.service.ParticipantService;
import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventDTO;
import com.cs203.locus.service.EventService;
import com.cs203.locus.service.EventTicketService;
import com.cs203.locus.service.ParticipantService;

import java.util.*;

import com.cs203.locus.models.event.EventTicket;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/participant")
public class ParticipantController {

    public ParticipantService participantService;

    private static final Logger LOGGER = LoggerFactory.getLogger(ParticipantController.class);

    @GetMapping(value = "/{id}")
    public @ResponseBody
    ResponseEntity<Participant> getParticipant(@PathVariable Integer id) {
        Participant result = participantService.findById(id);

        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/new")
    public @ResponseBody ResponseEntity<Participant> updateEvent(@Valid @RequestBody ParticipantDTO participantDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // TODO: handle various bad input
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Participant Information Fields");
        }

        Participant updated = participantService.createParticipant(participantDTO);
        return ResponseEntity.ok(updated);
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



}
