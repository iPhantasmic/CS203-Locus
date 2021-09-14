package com.cs203.creditswees.models.security;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

public class ResetPassword implements Serializable {

    private static final long serialVersionUID = 3499490410327206807L;

    @NotBlank
    private String password;

    @NotBlank
    private String confirmPassword;

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getConfirmPassword() { return confirmPassword; }
    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }
}