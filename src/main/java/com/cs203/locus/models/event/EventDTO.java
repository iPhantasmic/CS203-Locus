package com.cs203.locus.models.event;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Time;

public class EventDTO implements Serializable {

    @NotBlank
    private Integer organiserId;

    @NotBlank
    private String name;

    @NotBlank
    private String tag;

    @NotBlank
    private String description;

    @NotBlank
    private Date startDate;

    @NotBlank
    private Time startTime;

    @NotBlank
    private Date endDate;

    @NotBlank
    private Time endTime;

    public Integer getOrganiserId() { return organiserId; }

    public void setOrganiserId(Integer organiserId) { this.organiserId = organiserId; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getTag() { return tag; }

    public void setTag(String tag) { this.tag = tag; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public Date getStartDate() { return startDate; }

    public void setStartDate(Date startDate) { this.startDate = startDate; }

    public Time getStartTime() { return startTime; }

    public void setStartTime(Time startTime) { this.startTime = startTime; }

    public Date getEndDate() { return endDate; }

    public void setEndDate(Date endDate) { this.endDate = endDate; }

    public Time getEndTime() { return endTime; }

    public void setEndTime(Time endTime) { this.endTime = endTime; }
}
