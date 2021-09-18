package com.cs203.creditswees.models.event;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String tag;

    private String description;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Temporal(TemporalType.TIME)
    private Date startTime;

    @Temporal(TemporalType.DATE)
    private Date endDate;

    @Temporal(TemporalType.TIME)
    private Date endTime;

    private Date createAt;
    private Date updateAt;

//    TODO: mapping
//    to be mapped by Omer's organiser
//    @ManyToOne
//    @JoinColumn(name = "organiser_id")
//    private Organiser organiser;

//    Nicholas Ticket will map to mine
//    @OneToMany(mappedBy = "event_id", cascade = CascadeType.ALL)
//    private List<EventTicket> eventTicket;

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

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getTag() { return tag; }

    public void setTag(String tag) { this.tag = tag; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public void setStartDate(Date startDate) { this.startDate = startDate; }

    public Date getStartTime() { return startTime; }

    public void setStartTime(Date startTime) { this.startTime = startTime; }

    public Date getEndDate() { return endDate; }

    public void setEndDate(Date endDate) { this.endDate = endDate; }

    public Date getEndTime() { return endTime; }

    public void setEndTime(Date endTime) { this.endTime = endTime; }

    public Date getCreateAt() { return createAt; }

    public void setCreateAt(Date createAt) { this.createAt = createAt; }

    public Date getUpdateAt() { return updateAt; }

    public void setUpdateAt(Date updateAt) { this.updateAt = updateAt; }

    public Date getStartDate() { return startDate; }

//    public User getOrganiser() { return organiser; }
//
//    public void setOrganiser(User organiser) { this.organiser = organiser; }
}
