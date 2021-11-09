package com.cs203.locus.models.event;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.io.Serializable;
import java.time.LocalDateTime;

public class EventTicketDTO implements Serializable{

    @Positive
    private Integer id;

    @NotBlank
    private String participantName;

    @Positive
    private Integer participantId;

    private boolean isVaccinated;

    @NotBlank
    private String organiserName;

    @Positive
    private int organiserId;

    @NotBlank
    private String eventName;

    @Positive
    private int eventId;

    @NotBlank
    private LocalDateTime startDateTime;

    @NotBlank
    private LocalDateTime endDateTime;

    @NotBlank
    private String eventAddress;

    public int getId(){
        return id;
    }
    public void setId(int id) { this.id = id; }

    public String getParticipantName() {return participantName;}
    public void setParticipantName(String participantName) { this.participantName = participantName;}

    public int getParticipantId() { return participantId; }
    public void setParticipantId(int participantId)  { this.participantId = participantId; }

    public int getOrganiserId() { return organiserId; }
    public void setOrganiserId(int organiserId) { this.organiserId = organiserId; }

    public String getOrganiserName(){ return organiserName;}
    public void setOrganiserName(String organiserName) { this.organiserName = organiserName;}

    public String getEventName(){ return eventName;}
    public void setEventName(String eventName) { this.eventName = eventName;}

    public int getEventId(){ return eventId; }
    public void setEventId(int eventId){ this.eventId = eventId;}

    public LocalDateTime getStartDateTime(){ return startDateTime; }
    public void setStartDateTime(LocalDateTime startDateTime){ this.startDateTime = startDateTime;}

    public LocalDateTime getEndDateTime(){ return endDateTime; }
    public void setEndDateTime(LocalDateTime endDateTime){ this.endDateTime = endDateTime;}

    public String getEventAddress(){ return eventAddress; }
    public void setEventAddress(String eventAddress){ this.eventAddress = eventAddress; }

    public boolean getIsVaccinated(){ return isVaccinated; }
    public void setIsVaccinated(boolean isVaccinated){ this.isVaccinated = isVaccinated; }

}
