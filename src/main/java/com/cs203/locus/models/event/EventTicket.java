package com.cs203.locus.models.event;

import com.cs203.locus.models.participant.Participant;

import javax.persistence.*;


@Entity
public class EventTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;

    @ManyToOne
    @JoinColumn(name = "participant_id")
    private Participant participant;

    @ManyToOne
    @JoinColumn(name = "event_id")
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
