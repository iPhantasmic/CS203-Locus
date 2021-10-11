package com.cs203.locus.models.security;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GoogleUser {

//    private Integer id;

    @JsonProperty("name")
    private String firstName;

    @JsonProperty("family_name")
    private String lastName;

    private String email;

//    public Integer getId() { return id; }
//
//    public void setId(Integer id) {
//        this.id = id;
//    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
