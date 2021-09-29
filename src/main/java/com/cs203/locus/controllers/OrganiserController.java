package com.cs203.locus.controllers;

import com.cs203.locus.models.organiser.Organiser;
import com.cs203.locus.models.organiser.OrganiserDTO;
import com.cs203.locus.service.OrganiserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/organiser")
public class OrganiserController {

    public OrganiserService organiserService;

    private static final Logger LOGGER = LoggerFactory.getLogger(OrganiserController.class);

    @GetMapping(value = "/{id}")
    public @ResponseBody
    ResponseEntity<Organiser> getOrganiser(@PathVariable Integer id) {
        Organiser result = organiserService.findById(id);

        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/new")
    public @ResponseBody ResponseEntity<Organiser> updateEvent(@Valid @RequestBody OrganiserDTO organiserDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // TODO: handle various bad input
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Organiser Information Fields");
        }

        Organiser updated = organiserService.createOrganiser(organiserDTO);
        return ResponseEntity.ok(updated);
    }

    @PutMapping(path = "/{id}")
    public @ResponseBody ResponseEntity<Organiser> updateEvent(@PathVariable Integer id, @Valid @RequestBody OrganiserDTO organiserDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // TODO: handle various bad input
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Organiser Information Fields");
        }

        Organiser updated = organiserService.updateOrganiser(id, organiserDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping(path = "/{id}")
    public @ResponseBody ResponseEntity<Organiser> deleteEvent(@PathVariable Integer id) {
        Organiser deleted = organiserService.deleteOrganiser(id);

        return ResponseEntity.ok(deleted);
    }



}
