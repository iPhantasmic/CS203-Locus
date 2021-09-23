package com.cs203.creditswees.models.user;

import java.io.Serializable;

public class UserReturnDTO implements Serializable {

    private static final long serialVersionUID = -6781191844819251643L;

    private String username;

    private String name;

    private String email;

    private boolean emailVerified;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public boolean getEmailVerified() { return emailVerified; }
    public void setEmailVerified(boolean emailVerified) { this.emailVerified = emailVerified; }
}
