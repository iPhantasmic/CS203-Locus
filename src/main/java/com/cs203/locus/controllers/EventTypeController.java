package com.cs203.locus.controllers;

import com.cs203.locus.models.admin.RestrictionUpdate;
import com.cs203.locus.models.eventtype.EventType;
import com.cs203.locus.models.eventtype.EventTypeDTO;
import com.cs203.locus.service.EventTypeService;
import com.cs203.locus.util.EmailUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/event/type")
public class EventTypeController {

    @Autowired
    private EventTypeService eventTypeService;

    @Autowired
    private EmailUtil emailUtil;

    private static final Logger LOGGER = LoggerFactory.getLogger(EventTypeController.class);

    // List all EventTypes
    @GetMapping(value = "/list")
    public @ResponseBody
    ResponseEntity<?> getAllEventTypes() {
        Iterable<EventType> temp = eventTypeService.findAll();

        ArrayList<EventTypeDTO> result = new ArrayList<>();
        for (EventType eventType : temp) {
            EventTypeDTO toRet = new EventTypeDTO(eventType.getId(), eventType.getType(),
                    eventType.getCapacity());
            result.add(toRet);
        }

        return ResponseEntity.ok(result);
    }

    // Read an EventType
    @GetMapping(value = "/")
    public @ResponseBody
    ResponseEntity<EventTypeDTO> getEventType(@RequestParam Integer id) {
        EventType result = eventTypeService.findById(id);

        if (result == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No such EventType");
        }

        EventTypeDTO toRet = new EventTypeDTO(result.getId(), result.getType(),
                result.getCapacity());

        return ResponseEntity.ok(toRet);
    }

    // Create an EventType
    @PostMapping(path = "/new")
    public @ResponseBody
    ResponseEntity<EventTypeDTO> createEvent(@Valid @RequestBody EventTypeDTO eventTypeDTO) {
        EventType newEventType = new EventType();

        newEventType.setType(eventTypeDTO.getType());
        newEventType.setCapacity(eventTypeDTO.getCapacity());

        newEventType = eventTypeService.createEventType(newEventType);
        EventTypeDTO toRet = new EventTypeDTO(newEventType.getId(), newEventType.getType(),
                newEventType.getCapacity());

        return ResponseEntity.ok(toRet);
    }

    // update an EventType
    @PutMapping(path = "/{id}")
    public @ResponseBody
    ResponseEntity<EventTypeDTO> updateEventType(@PathVariable Integer id,
                                         @Valid @RequestBody EventTypeDTO eventTypeDTO) {
        EventType updated = eventTypeService.updateEventType(eventTypeDTO);
        if (updated == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No EventType with ID: " + id);
        }

        EventTypeDTO toRet = new EventTypeDTO(updated.getId(), updated.getType(),
                updated.getCapacity());

        return ResponseEntity.ok(toRet);
    }

    // delete an EventType
    @DeleteMapping(path = "/{id}")
    public @ResponseBody
    ResponseEntity<EventTypeDTO> deleteEventType(@PathVariable Integer id) {
        if (eventTypeService.deleteEventType(id) == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No EventType with ID: " + id);
        }

        EventType deleted = eventTypeService.deleteEventType(id);

        EventTypeDTO toRet = new EventTypeDTO(deleted.getId(), deleted.getType(),
                deleted.getCapacity());

        return ResponseEntity.ok(toRet);
    }

    // TODO: need emailutil to be done
//    @PostMapping(path = "/notification")
//    public @ResponseBody
//    ResponseEntity<?> capacityUpdated(@RequestBody RestrictionUpdate updatedRestrictions) {
//        List<String> eventTypes = updatedRestrictions.getEventTypes();
//        for (String eventType : eventTypes) {
//
//        }
//        // TODO: send email here
//
//        return ResponseEntity.ok("OK");
//    }
}
