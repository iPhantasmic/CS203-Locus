package com.cs203.locus.models.eventtype;

import com.cs203.locus.models.event.Event;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
public class EventType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    @NotBlank
    private String type;

    @Min(value=0)
    private int capacity;

    @OneToMany(mappedBy = "type", cascade = CascadeType.ALL)
    private List<Event> event;

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public String getType() { return type; }

    public void setType(String type) { this.type = type; }

    public int getCapacity() { return capacity; }

    public void setCapacity(int capacity) { this.capacity = capacity; }

    public List<Event> getEvent() { return event; }

    public void setEvent(List<Event> event) { this.event = event; }
}
