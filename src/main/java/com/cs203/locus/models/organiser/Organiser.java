package com.cs203.locus.models.organiser;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.user.User;

import javax.persistence.*;
import java.util.List;

@Entity
public class Organiser {

    @Id
    @Column(name = "user_id")
    private Integer id;

    // remove and add attributes after discussion
    private String companyName;

    private String companyAcra;

    private String companySector;

    // map to User
    @OneToOne
    @MapsId
    @JoinColumn(name="user_id")
    private User user;

    // Justin's event maps to organiser
    @OneToMany(mappedBy = "organiser", cascade = CascadeType.ALL)
    private List<Event> events;

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyAcra() {
        return companyAcra;
    }

    public void setCompanyAcra(String companyAcra) {
        this.companyAcra = companyAcra;
    }

    public String getCompanySector() {
        return companySector;
    }

    public void setCompanySector(String companySector) {
        this.companySector = companySector;
    }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

    public List<Event> getEvents() { return events; }

    public void setEvents(List<Event> events) { this.events = events; }

}
