package com.cs203.locus.models.eventtype;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

public class EventTypeDTO implements Serializable {

    @Min(value = 0)
    private int id;

    @NotBlank
    private String type;

    @Min(value=0)
    private int capacity;

    public EventTypeDTO(Integer id, String type, int capacity) {
        this.id = id;
        this.type = type;
        this.capacity = capacity;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getCapacity() { return capacity;}

    public void setCapacity(int capacity) { this.capacity = capacity; }
}
