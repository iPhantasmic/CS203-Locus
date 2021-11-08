package com.cs203.locus.models.participant;
import com.fasterxml.jackson.annotation.JsonGetter;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Date;


public class ParticipantVaxDTO implements Serializable {

    private static final long serialVersionUID = -8661467404585749884L;

    @NotBlank
    private int id;

    @NotBlank
    private String name;

    @NotBlank
    private boolean vaxStatus;
    private String vaxGcsUrl;

    @NotBlank
    private boolean emailStatus;
    private String email;

    @NotBlank
    private Date createdAt;

    @NotBlank
    private Date updatedAt;

    public ParticipantVaxDTO(int id, String name, boolean vaxStatus, String vaxGcsUrl, boolean emailStatus, String email, Date createdAt, Date updatedAt) {
        this.id = id;
        this.name = name;
        this.vaxStatus = vaxStatus;
        this.vaxGcsUrl = vaxGcsUrl;
        this.emailStatus = emailStatus;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Integer getId() { return id; }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isVaxStatus() {
        return vaxStatus;
    }

    public void setVaxStatus(boolean vaxStatus) {
        this.vaxStatus = vaxStatus;
    }

    public String getVaxGcsUrl() {
        return vaxGcsUrl;
    }

    public void setVaxGcsUrl(String vaxGcsUrl) {
        this.vaxGcsUrl = vaxGcsUrl;
    }

    public boolean getEmailStatus() {
        return emailStatus;
    }

    public void setEmailStatus(boolean emailStatus) {
        this.emailStatus = emailStatus;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}