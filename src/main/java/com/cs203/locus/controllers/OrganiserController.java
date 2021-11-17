package com.cs203.locus.controllers;

import com.cs203.locus.models.organiser.Organiser;
import com.cs203.locus.models.organiser.OrganiserDTO;
import com.cs203.locus.service.OrganiserService;
import com.cs203.locus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;


@RestController
@RequestMapping(path = "/organiser")
public class OrganiserController {

    @Autowired
    public OrganiserService organiserService;

    @Autowired
    public UserService userService;

    // get Organiser based on their ID
    @GetMapping(value = "/{id}")
    public @ResponseBody
    ResponseEntity<OrganiserDTO> getOrganiser(@PathVariable Integer id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // We only allow Admin or the User itself. Hence, if not both, give 403 Forbidden
        if (!auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))
                && !userService.findByUsername(auth.getName()).getId().equals(id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        Organiser result = organiserService.findById(id);

        OrganiserDTO toRet = new OrganiserDTO();
        toRet.setId(result.getId());
        toRet.setCompanySector(result.getCompanySector());
        toRet.setCompanyName(result.getCompanyName());
        toRet.setCompanyAcra(result.getCompanyAcra());

        return ResponseEntity.ok(toRet);
    }

    @PutMapping(path = "/{id}")
    public @ResponseBody
    ResponseEntity<OrganiserDTO> updateOrganiser(@PathVariable Integer id, @Valid @RequestBody OrganiserDTO organiserDTO, BindingResult bindingResult) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // We only allow Admin or the User itself. Hence, if not both, give 403 Forbidden
        if (!auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))
                && !userService.findByUsername(auth.getName()).getId().equals(id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        if (bindingResult.hasErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Organiser Information Fields");
        }

        Organiser updated = organiserService.updateOrganiser(id, organiserDTO);

        if (updated == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No organiser with ID: " + id);
        }

        OrganiserDTO toRet = new OrganiserDTO();
        toRet.setId(updated.getId());
        toRet.setCompanySector(updated.getCompanySector());
        toRet.setCompanyName(updated.getCompanyName());
        toRet.setCompanyAcra(updated.getCompanyAcra());

        return ResponseEntity.ok(toRet);
    }

}
