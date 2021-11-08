package com.cs203.locus.models.event;

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
    private int capacityPET;

    @Min(value=0)
    private int capacityNonPET;

    @OneToMany(mappedBy = "type", cascade = CascadeType.ALL)
    private List<Event> event;

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public String getType() { return type; }

    public void setType(String type) { this.type = type; }

    public int getCapacityPET() { return capacityPET; }

    public void setCapacityPET(int capacityPET) { this.capacityPET = capacityPET; }

    public int getCapacityNonPET() { return capacityNonPET; }

    public void setCapacityNonPET(int capacityNonPET) { this.capacityNonPET = capacityNonPET; }

    public List<Event> getEvent() { return event; }

    public void setEvent(List<Event> event) { this.event = event; }
}
