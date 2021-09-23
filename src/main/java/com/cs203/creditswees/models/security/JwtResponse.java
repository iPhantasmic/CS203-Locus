package com.cs203.creditswees.models.security;

import java.io.Serializable;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = 7228813775753398362L;
    private final String jwttoken;
    private final String username;
    private final String email;

    public JwtResponse(String username, String email, String jwttoken) {
        this.username = username;
        this.email = email;
        this.jwttoken = jwttoken;
    }

    public String getToken() {
        return this.jwttoken;
    }

    public String getUsername() { return this.username; }

    public String getEmail() { return this.email; }
}