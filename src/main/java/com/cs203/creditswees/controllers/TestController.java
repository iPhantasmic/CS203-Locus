package com.cs203.creditswees.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping(path = "/test")
    public @ResponseBody ResponseEntity<?> test1() {
        return ResponseEntity.ok("First API!");
    }

}
