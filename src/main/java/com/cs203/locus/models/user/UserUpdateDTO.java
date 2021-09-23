package com.cs203.locus.models.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

public class UserUpdateDTO implements Serializable {

    private static final long serialVersionUID = 2923182463051122701L;
    
    @NotBlank
    private String username;

    @NotBlank
    private String name;

    @Email(message = "Email is invalid!")
    @NotBlank
    private String email;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}