package com.cs203.creditswees.models.Event;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


//TODO: Include mapping for to userID and eventID
@Entity
public class EventTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;

    private Integer userId;

    private Integer eventId;

    public EventTicket(int id, int userId, int eventId){
        this.id = id;
        this.userId = userId;
        this.eventId = eventId;
    }

    public int getId(){
        return this.id;
    }
    public int getUserId(){
        return this.userId;
    }
    public int getEventId(){
        return this.eventId;
    }
}
