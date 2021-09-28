package com.cs203.locus.service;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.organiser.Organiser;
import com.cs203.locus.models.organiser.OrganiserDTO;
import com.cs203.locus.models.user.User;
import com.cs203.locus.repository.OrganiserRepository;
import com.cs203.locus.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;

@Service
public class OrganiserService {

    final OrganiserRepository organiserRepository;

    final UserRepository userRepository;

    // @Autowired ?
    public OrganiserService(OrganiserRepository organiserRepository, UserRepository userRepository) {
        this.organiserRepository = organiserRepository;
        this.userRepository = userRepository;
    }

    public Organiser findById(Integer id){
        if (organiserRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No organiser with ID: " + id);
        }
        return organiserRepository.findById(id).get();
    }

    public Organiser findByUserId(Integer userId){
        if (userRepository.findById(userId).isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No organiser associated with UserID: " + userId);
        }

        User user = userRepository.findById(userId).get();

        // Review needed, not sure if this is right
        return user.getOrganiserProfile();
    }

    public Organiser createOrganiser(OrganiserDTO organiserDTO){
        Organiser newOrganiser = new Organiser();

        newOrganiser.setCompanyName(organiserDTO.getCompanyName());
        newOrganiser.setCompanyAcra(organiserDTO.getCompanyAcra());
        newOrganiser.setCompanySector(organiserDTO.getCompanySector());

        // is a getUser method necessary in the organiserDTO class?
        // current.setUser(organiserDTO.getUser());

        return newOrganiser;
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
