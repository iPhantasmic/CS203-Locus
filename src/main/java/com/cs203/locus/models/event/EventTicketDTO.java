package com.cs203.locus.models.event;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.event.Event;
import java.io.Serializable;

public class EventTicketDTO implements Serializable{

    private Integer id;

    private Participant participant;

    private Event event;


    public int getId(){
        return id;
    }

    public void setId(Integer id) { this.id = id; }

    public Participant getParticipant(){
        return participant;
    }

    public void setParticipant(Participant participant) { this.participant = participant; }

    public Event getEvent(){ return event; }

    public void setEvent(Event event) { this.event = event; }
}
