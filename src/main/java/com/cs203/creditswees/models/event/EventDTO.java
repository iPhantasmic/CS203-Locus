package com.cs203.creditswees.models.event;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Date;

public class EventDTO implements Serializable {

    @NotBlank
    private String name;

    @NotBlank
    private String tag;

    @NotBlank
    private String description;

    @NotBlank
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @NotBlank
    @Temporal(TemporalType.TIME)
    private Date startTime;

    @NotBlank
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @NotBlank
    @Temporal(TemporalType.TIME)
    private Date endTime;

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getTag() { return tag; }

    public void setTag(String tag) { this.tag = tag; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public Date getStartDate() { return startDate; }

    public void setStartDate(Date startDate) { this.startDate = startDate; }

    public Date getStartTime() { return startTime; }

    public void setStartTime(Date startTime) { this.startTime = startTime; }

    public Date getEndDate() { return endDate; }

    public void setEndDate(Date endDate) { this.endDate = endDate; }

    public Date getEndTime() { return endTime; }

    public void setEndTime(Date endTime) { this.endTime = endTime; }
}
