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
import java.util.ArrayList;


@RestController
@RequestMapping(path = "/organiser")
public class OrganiserController {

    @Autowired
    public OrganiserService organiserService;

    // get Organiser based on their ID
    @GetMapping(value = "/{id}")
    public @ResponseBody
    ResponseEntity<Organiser> getOrganiser(@PathVariable Integer id) {
        Organiser result = organiserService.findById(id);

        return ResponseEntity.ok(result);
    }

    // get All Organisers
    @GetMapping(value = "/list")
    public @ResponseBody ResponseEntity<?> getAllOrganisers() {
        Iterable<Organiser> temp = organiserService.findAll();
        ArrayList<OrganiserDTO> result = new ArrayList<>();
        for (Organiser organiser : temp) {
            OrganiserDTO toRet = new OrganiserDTO();
            toRet.setCompanyAcra(organiser.getCompanyAcra());
            toRet.setCompanyName(organiser.getCompanyName());
            toRet.setCompanySector(organiser.getCompanySector());
            toRet.setId(organiser.getId());

            result.add(toRet);
        }
        return ResponseEntity.ok(result);
    }

    @PutMapping(path = "/{id}")
    public @ResponseBody ResponseEntity<Organiser> updateOrganiser(@PathVariable Integer id, @Valid @RequestBody OrganiserDTO organiserDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // TODO: handle various bad input
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Organiser Information Fields");
        }

        Organiser updated = organiserService.updateOrganiser(id, organiserDTO);

        if (updated == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No organiser with ID: " + id);
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping(path = "/{id}")
    public @ResponseBody ResponseEntity<Organiser> deleteOrganiser(@PathVariable Integer id) {
        Organiser deleted = organiserService.deleteOrganiser(id);

        if(deleted == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No Organiser with ID: " + id);
        }
        return ResponseEntity.ok(deleted);
    }

}
