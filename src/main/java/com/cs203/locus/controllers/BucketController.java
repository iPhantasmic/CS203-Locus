package com.cs203.locus.controllers;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.user.User;
import com.cs203.locus.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;

@Controller
public class BucketController {

//    public ParticipantSerivce participantSerivce;

//    public UserService userService;


    @PutMapping(path = "/gcs/upload/vacc/{filename}")
    public @ResponseBody ResponseEntity<Event> getEvent(@PathVariable String filename, Principal principal) {
//        User currentUser = userService.findByUsername(principal.getName());
//        Participant currentUser = participantService.findByUserId(currentUser.getId());
//        // Manipulate filename to form url in service
//        Participant updated = participantService.updateAwsUrlById(filename, currentUser.getId());
//
//        return ResponseEntity.ok(Participant);
        return null;
    }
}
