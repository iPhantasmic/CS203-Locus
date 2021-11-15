package com.cs203.locus.service;

import com.cs203.locus.models.eventtype.EventType;
import com.cs203.locus.models.eventtype.EventTypeDTO;
import com.cs203.locus.repository.EventTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class EventTypeService {

    @Autowired
    private EventTypeRepository eventTypeRepository;


    public Iterable<EventType> findAll() {
        return eventTypeRepository.findAll();
    }

    public EventType findById(Integer id) {
        Optional<EventType> result = eventTypeRepository.findById(id);
        if (result.isEmpty()) {
            return null;
        }

        return result.get();
    }

    public EventType findByType(String type) {
        return eventTypeRepository.findByType(type);
    }

    public EventType createEventType(EventType newEventType) {
        return eventTypeRepository.save(newEventType);
    }

    public EventType updateEventType(Integer id, EventTypeDTO updatedEventTypeDTO) {
        Optional<EventType> result = eventTypeRepository.findById(id);
        if (result.isEmpty()) {
            return null;
        }

        EventType toUpdate = result.get();
        toUpdate.setType(updatedEventTypeDTO.getType());
        toUpdate.setCapacity(updatedEventTypeDTO.getCapacity());

        return eventTypeRepository.save(toUpdate);
    }

    @Transactional
    public EventType deleteEventType(Integer id) {
        Optional<EventType> result = eventTypeRepository.findById(id);
        if (result.isEmpty()) {
            return null;
        }
        eventTypeRepository.delete(result.get());
        return result.get();
    }

}
