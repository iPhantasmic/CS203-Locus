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
}
