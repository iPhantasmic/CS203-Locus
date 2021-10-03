package com.cs203.locus.models.security;

import java.io.Serializable;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = 7228813775753398362L;
    private final String name;
    private final String jwttoken;
    private final String username;
    private final String email;

    public JwtResponse(String name, String username, String email, String jwttoken) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.jwttoken = jwttoken;
    }

    public String getName() { return name; }

    public String getToken() {
        return jwttoken;
    }

    public String getUsername() { return username; }

    public String getEmail() { return email; }

}