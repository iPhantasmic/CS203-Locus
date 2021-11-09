package com.cs203.locus.controllers;

import com.cs203.locus.models.admin.NewsArticleDTO;
import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.participant.ParticipantDTO;
import com.cs203.locus.models.participant.ParticipantVaxDTO;
import com.cs203.locus.service.ParticipantService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    ParticipantService participantService;

    @Value("${news.microservice.url}")
    private String NEWS_MICROSERVICE_URL;

    private static final Logger LOGGER = LoggerFactory.getLogger(AdminController.class);

    @GetMapping(value = "/all-verification")
//    @PreAuthorize("hasRole('ADMIN')")
    public @ResponseBody
    ResponseEntity<List<ParticipantVaxDTO>> getAllVerification() {
        List<ParticipantVaxDTO> result = participantService.findAllVerification();

        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/pending-verification")
//    @PreAuthorize("hasRole('ADMIN')")
    public @ResponseBody
    ResponseEntity<List<ParticipantVaxDTO>> getPendingVerification() {
        List<ParticipantVaxDTO> result = participantService.findByPendingVerification();

        return ResponseEntity.ok(result);
    }

    @PutMapping(path = "/verification/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
    public @ResponseBody
    ResponseEntity<ParticipantDTO> acceptVerification(@PathVariable Integer id, @RequestParam boolean isVerified) {
        Participant updated = null;
        if (isVerified) {
            updated = participantService.verifyParticipant(id);
        } else if (!isVerified) {
            updated = participantService.rejectParticipant(id);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        if (updated == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid Participant ID");
        }

        ParticipantDTO toRet = new ParticipantDTO();
        toRet.setId(updated.getId());
        toRet.setVaxStatus(updated.getVaxStatus());
        toRet.setVaxGcsUrl(updated.getVaxGcsUrl());

        return ResponseEntity.ok(toRet);
    }

    @PostMapping(path = "/news")
    public @ResponseBody
    ResponseEntity<?> createNews(@RequestBody NewsArticleDTO newsArticleDTO) {
        String requestJson = newsArticleDTO.toJson();
        HttpResponse<String> result;
        try {
            // Make POST request to create a new NewsArticle/Post on the Flask news microservice
            HttpRequest createNews = HttpRequest.newBuilder()
                    .uri(URI.create(NEWS_MICROSERVICE_URL))
                    .headers("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestJson))
                    .build();
            result = HttpClient.newBuilder()
                    .build()
                    .send(createNews, HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            LOGGER.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (result.statusCode() == 200) {
            // Successfully created news
            return ResponseEntity.ok(newsArticleDTO);
        } else {
            return ResponseEntity.badRequest().body("Invalid News Fields");
        }
    }

    @PutMapping(path = "/news")
    public @ResponseBody
    ResponseEntity<?> updateNews(@RequestBody NewsArticleDTO newsArticleDTO) {
        String requestJson = newsArticleDTO.toJson();
        HttpResponse<String> result;
        try {
            // Make DELETE request to delete a new NewsArticle/Post on the Flask news microservice
            HttpRequest deleteNews = HttpRequest.newBuilder()
                    .uri(URI.create(NEWS_MICROSERVICE_URL + "&articleId=" + newsArticleDTO.getArticleLink()))
                    .headers("Content-Type", "application/json")
                    .PUT(HttpRequest.BodyPublishers.ofString(requestJson))
                    .build();
            result = HttpClient.newBuilder()
                    .build()
                    .send(deleteNews, HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            LOGGER.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (result.statusCode() == 200) {
            return ResponseEntity.ok("News Deleted");
        } else {
            return ResponseEntity.badRequest().body("Invalid News Link/Fields");
        }
    }

    @DeleteMapping(path = "/news")
    public @ResponseBody
    ResponseEntity<?> deleteNews(@RequestBody String link) {
        HttpResponse<String> result;
        try {
            // Make DELETE request to delete a new NewsArticle/Post on the Flask news microservice
            HttpRequest deleteNews = HttpRequest.newBuilder()
                    .uri(URI.create(NEWS_MICROSERVICE_URL + "&articleId=" + link))
                    .DELETE()
                    .build();
            result = HttpClient.newBuilder()
                    .build()
                    .send(deleteNews, HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            LOGGER.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (result.statusCode() == 200) {
            return ResponseEntity.ok("News Deleted");
        } else {
            return ResponseEntity.badRequest().body("Invalid News Link");
        }
    }

}
