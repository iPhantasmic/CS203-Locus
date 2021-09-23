package com.cs203.creditswees.service;

import com.cs203.creditswees.models.event.Event;
import com.cs203.creditswees.models.organiser.Organiser;
import com.cs203.creditswees.models.organiser.OrganiserDTO;
import com.cs203.creditswees.repository.OrganiserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class OrganiserService {

    final OrganiserRepository organiserRepository;

    // @Autowired ?
    public OrganiserService(OrganiserRepository organiserRepository) { this.organiserRepository = organiserRepository; }

    public Organiser findById(Integer id){
        if (organiserRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No organiser with ID: " + id);
        }
        return organiserRepository.findById(id).get();
    }

    public Organiser updateOrganiser(Integer id, OrganiserDTO organiserDTO){
        if (organiserRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No organiser with ID: " + id);
        }

        Organiser current = organiserRepository.findById(id).get();
        current.setCompanyName(organiserDTO.getCompanyName());
        current.setCompanyAcra(organiserDTO.getCompanyAcra());
        current.setCompanySector(organiserDTO.getCompanySector());

        return organiserRepository.save(current);
    }

    // need to add more methods?

}
