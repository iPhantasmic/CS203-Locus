package com.cs203.locus.models.participant;

import com.cs203.locus.models.user.User;
import com.cs203.locus.models.event.EventTicket;

import org.hibernate.annotations.Type;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
public class Participant {
    
    @Id
    private Integer id;

    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean vaxStatus;

    private String vaxAwsUrl;

    // map to User
    @OneToOne
    @MapsId
    @JoinColumn(name="id")
    private User user;

    // map to Ticket
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<EventTicket> eventTicket;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public boolean getVaxStatus() {
        return vaxStatus;
    }

    public void setVaxStatus(boolean vaxStatus) {
        this.vaxStatus = vaxStatus;
    }

    public String getVaxAwsUrl() {
        return vaxAwsUrl;
    }

    public void setVaxAwsUrl(String vaxAwsUrl) {
        this.vaxAwsUrl = vaxAwsUrl;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<EventTicket> getEventTicket() {
        return eventTicket;
    }

    public void setEventTicket(List<EventTicket> eventTicket) {
        this.eventTicket = eventTicket;
    }
}
