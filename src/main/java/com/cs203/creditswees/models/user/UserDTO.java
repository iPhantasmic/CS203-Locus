package com.cs203.creditswees.models.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

public class UserDTO implements Serializable {

    private static final long serialVersionUID = 6039321808442141068L;

    @NotBlank
    private String username;

    @NotBlank
    private String name;

    @NotBlank
    private String password;

    @NotBlank
    private String confirmPassword;

    @Email(message = "Email is invalid!")
    private String email;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getConfirmPassword() { return confirmPassword; }
    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}