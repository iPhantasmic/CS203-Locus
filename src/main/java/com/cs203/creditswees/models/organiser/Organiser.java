package com.cs203.creditswees.models.organiser;

import com.cs203.creditswees.models.event.Event;
import com.cs203.creditswees.models.user.User;

import javax.persistence.*;
import java.util.List;

@Entity
public class Organiser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "organiser_id")
    private Integer id;

    // remove and add attributes after discussion
    private String companyName;
    private String companyAcra;
    private String companySector;

    // map to User
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    // Justin's event maps to organiser
    @OneToMany(mappedBy = "organiser_id", cascade = CascadeType.ALL)
    private List<Event> events;

    // to add?
//    public User getUser(){
//
//    }

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

}
