package com.cs203.locus.models.event;

import com.cs203.locus.models.eventtype.EventType;
import com.cs203.locus.models.organiser.Organiser;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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

    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isPrivate;

    @Column(unique=true)
    private String inviteCode;

    @NotBlank
    private String tag;

    @Lob
    @NotBlank
    private String description;

    @NotBlank
    private String address;

    @Future
    private LocalDateTime startDateTime;

    @Future
    private LocalDateTime endDateTime;

    private String imageGcsUrl;

    private Date createAt;
    private Date updateAt;

    private double lat;
    private double lng;

    @NotNull
    @Range(min = 1)
    private int maxParticipants;

    @ManyToOne
    @JoinColumn(name = "event_type")
    private EventType type;

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

    public boolean isPrivate() { return isPrivate; }

    public void setPrivate(boolean isPrivate) { this.isPrivate = isPrivate; }

    public String getInviteCode() { return inviteCode; }

    public void setInviteCode(String inviteCode) { this.inviteCode = inviteCode; }

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

    public String getImageGcsUrl() { return imageGcsUrl; }

    public void setImageGcsUrl(String imageGcsUrl) { this.imageGcsUrl = imageGcsUrl; }

    public EventType getType() { return type; }

    public void setType(EventType type) { this.type = type; }

    public Organiser getOrganiser() { return organiser; }

    public void setOrganiser(Organiser organiser) { this.organiser = organiser; }

    public List<EventTicket> getEventTicket() { return eventTicket; }

    public void setEventTicket(List<EventTicket> eventTicket) { this.eventTicket = eventTicket; }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public int getMaxParticipants() { return maxParticipants; }

    public void setMaxParticipants(int maxParticipants) { this.maxParticipants = maxParticipants;}

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", isPrivate=" + isPrivate +
                ", inviteCode='" + inviteCode + '\'' +
                ", tag='" + tag + '\'' +
                ", description='" + description + '\'' +
                ", address='" + address + '\'' +
                ", startDateTime=" + startDateTime +
                ", endDateTime=" + endDateTime +
                ", imageGcsUrl='" + imageGcsUrl + '\'' +
                ", createAt=" + createAt +
                ", updateAt=" + updateAt +
                ", lat=" + lat +
                ", lng=" + lng +
                ", maxParticipants=" + maxParticipants +
                ", type=" + type +
                ", organiser=" + organiser +
                ", eventTicket=" + eventTicket +
                '}';
    }
}
