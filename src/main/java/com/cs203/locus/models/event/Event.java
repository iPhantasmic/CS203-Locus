package com.cs203.locus.models.event;


import com.cs203.locus.models.organiser.Organiser;

import javax.persistence.*;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String name;

    @NotBlank
    private String tag;

    @NotBlank
    private String description;

    @NotBlank
    private String address;

    @Future
    private LocalDateTime startDateTime;

    @Future
    private LocalDateTime endDateTime;

    private Date createAt;
    private Date updateAt;

    @ManyToOne
    @JoinColumn(name = "organiser_id")
    private Organiser organiser;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<EventTicket> eventTicket;

    @PrePersist
    public void logTime() {
        Date temp = new Date();
        Date param = new java.sql.Timestamp(temp.getTime());
        createAt = param;
        updateAt = param;
    }

    @PreUpdate
    public void logUpdate() {
        Date temp = new Date();
        updateAt = new java.sql.Timestamp(temp.getTime());
    }

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getTag() { return tag; }

    public void setTag(String tag) { this.tag = tag; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public String getAddress() { return address; }

    public void setAddress(String address) { this.address = address; }

    public LocalDateTime getStartDateTime() { return startDateTime; }

    public void setStartDateTime(LocalDateTime startDateTime) { this.startDateTime = startDateTime; }

    public LocalDateTime getEndDateTime() { return endDateTime; }

    public void setEndDateTime(LocalDateTime endDateTime) { this.endDateTime = endDateTime; }

    public Date getCreateAt() { return createAt; }

    public void setCreateAt(Date createAt) { this.createAt = createAt; }

    public Date getUpdateAt() { return updateAt; }

    public void setUpdateAt(Date updateAt) { this.updateAt = updateAt; }

    public Organiser getOrganiser() { return organiser; }

    public void setOrganiser(Organiser organiser) { this.organiser = organiser; }

    public List<EventTicket> getEventTicket() { return eventTicket; }

    public void setEventTicket(List<EventTicket> eventTicket) { this.eventTicket = eventTicket; }

}
