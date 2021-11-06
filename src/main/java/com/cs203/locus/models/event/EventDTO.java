package com.cs203.locus.models.event;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.io.Serializable;


public class EventDTO implements Serializable {

    @Min(value = 0)
    private int id;

    @Positive
    private int organiserId;

    @NotBlank
    private String name;

    @NotBlank
    private String tag;

    @NotBlank
    private String description;

    @NotBlank
    private String address;

    @NotBlank
    private String startDateTime;

    @NotBlank
    private String endDateTime;

    private String imageGcsUrl;

    public int getId() {return id;}

    public void setId(int id) { this.id = id; }

    public Integer getOrganiserId() { return organiserId; }

    public void setOrganiserId(Integer organiserId) { this.organiserId = organiserId; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getTag() { return tag; }

    public void setTag(String tag) { this.tag = tag; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public String getAddress() { return address; }

    public void setAddress(String address) { this.address = address; }

    public String getStartDateTime() { return startDateTime; }

    public void setStartDateTime(String startDateTime) { this.startDateTime = startDateTime; }

    public String getEndDateTime() { return endDateTime; }

    public void setEndDateTime(String endDateTime) { this.endDateTime = endDateTime; }

    public String getImageGcsUrl() { return imageGcsUrl; }

    public void setImageGcsUrl(String imageGcsUrl) { this.imageGcsUrl = imageGcsUrl; }
}
