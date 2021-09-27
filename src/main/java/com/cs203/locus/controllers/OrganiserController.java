package com.cs203.locus.controllers;

import com.cs203.locus.repository.OrganiserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/organiser")
public class OrganiserController {

    @Autowired
    public OrganiserRepository organiserRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(OrganiserController.class);


}
