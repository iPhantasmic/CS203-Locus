package com.cs203.locus.models.admin;

import java.io.Serializable;
import java.util.List;

public class RestrictionUpdate implements Serializable {

    private List<String> eventTypes;

    public List<String> getEventTypes() { return eventTypes; }

    public void setEventTypes(List<String> eventTypes) { this.eventTypes = eventTypes; }

}
