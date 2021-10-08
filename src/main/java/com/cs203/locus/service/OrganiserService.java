package com.cs203.locus.service;

import com.cs203.locus.models.organiser.Organiser;
import com.cs203.locus.models.organiser.OrganiserDTO;
import com.cs203.locus.repository.OrganiserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;

@Service
public class OrganiserService {

    @Autowired
    private OrganiserRepository organiserRepository;

    // get Organiser by Id
    public Organiser findById(Integer id) {
        if (organiserRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No organiser with ID: " + id);
        }
        return organiserRepository.findById(id).get();
    }

    // find all Organisers
    public Iterable<Organiser> findAll() {
        return organiserRepository.findAll();
    }

    public Organiser createOrganiser(Organiser organiser) {
        return organiserRepository.save(organiser);
    }

    public Organiser updateOrganiser(Integer id, OrganiserDTO organiserDTO) {
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

    @Transactional
    public Organiser deleteOrganiser(Integer id) {
        if (organiserRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No Organiser with ID: " + id);
        }

        Organiser current = organiserRepository.findById(id).get();
        organiserRepository.delete(current);
        return current;
    }

}
