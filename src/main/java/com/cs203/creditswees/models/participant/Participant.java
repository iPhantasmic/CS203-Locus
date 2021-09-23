package com.cs203.creditswees.models.participant;
import com.cs203.creditswees.models.user.User;
//import com.cs203.creditswees.models.organiser.Organiser;

import org.hibernate.annotations.Type;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class Participant {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "participant_id")
    private Integer id;

    @NotBlank
    private boolean vaxStatus;

    private String vaxAwsUrl;

    // map to User
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    // map to Ticket
    // @OneToMany(mappedBy = "event_id", cascade = CascadeType.ALL)
    // private List<EventTicket> eventTicket;

    public void setUrl(String vaxAwsUrl) {
        this.vaxAwsUrl = vaxAwsUrl;
    }

    public String getUrl(){
        return vaxAwsUrl;
    }

    public void setVaxStatus(boolean vaxStatus){
        this.vaxStatus = vaxStatus;
    }

    public boolean getVaxStatus(){
        return vaxStatus;
    }

}
