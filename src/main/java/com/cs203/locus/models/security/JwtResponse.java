package com.cs203.locus.models.security;

import java.io.Serializable;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = 7228813775753398362L;
    private final Integer id;
    private final String name;
    private final String username;
//    private final String jwttoken;

    public JwtResponse(Integer id, String name, String username) {
        this.id = id;
        this.name = name;
        this.username = username;
//        this.jwttoken = jwttoken;
    }

    public Integer getId() { return id; }

    public String getName() { return name; }

    public String getUsername() { return username; }

//    public String getToken() {
//        return jwttoken;
//    }

}