package com.cs203.locus.models.event;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.event.Event;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDateTime;

public class EventTicketDTO implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String participantName;

    @NotBlank
    private String organiserName;

    @NotBlank
    private String eventName;

    @NotBlank
    private Integer eventId;

    @NotBlank
    private LocalDateTime startDateTime;

    @NotBlank
    private LocalDateTime endDateTime;

    @NotBlank
    private String eventAddress;

    public int getId(){
        return id;
    }
    public void setId(Integer id) { this.id = id; }

    public String getParticipantName() {return participantName;}
    public void setParticipantName(String participantName) { this.participantName = participantName;}

    public String getOrganiserName(){ return organiserName;}
    public void setOrganiserName(String organiserName) { this.organiserName = organiserName;}

    public String getEventName(){ return eventName;}
    public void setEventName(String eventName) { this.eventName = eventName;}

    public Integer getEventId(){ return eventId; }
    public void setEventId(Integer eventId){ this.eventId = eventId;}

    public LocalDateTime getStartDateTime(){ return startDateTime; }
    public void setStartDateTime(LocalDateTime startDateTime){ this.startDateTime = startDateTime;}

    public LocalDateTime getEndDateTime(){ return endDateTime; }
    public void setEndDateTime(LocalDateTime endDateTime){ this.endDateTime = endDateTime;}

    public String getEventAddress(){ return eventAddress; }
    public void setEventAddress(String eventAddress){ this.eventAddress = eventAddress; }

}
