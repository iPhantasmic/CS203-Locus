package com.cs203.locus.controllers;

import com.cs203.locus.models.organiser.Organiser;
import com.cs203.locus.models.organiser.OrganiserDTO;
import com.cs203.locus.service.OrganiserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;


@RestController
@RequestMapping(path = "/organiser")
public class OrganiserController {

    @Autowired
    public OrganiserService organiserService;

    @GetMapping(value = "/{id}")
    public @ResponseBody
    ResponseEntity<Organiser> getOrganiser(@PathVariable Integer id) {
        Organiser result = organiserService.findById(id);

        return ResponseEntity.ok(result);
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

    // TODO: get all events organised by particular organiser

}
