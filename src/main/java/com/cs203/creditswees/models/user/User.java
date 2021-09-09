package com.cs203.creditswees.models.user;

import org.hibernate.annotations.Type;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @Email
    @Column(unique = true)
    private String email;

    @NotBlank
    private String name;

    @NotBlank
    private String role;

    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean emailVerified;

    private Date createAt;
    private Date updateAt;

    @PrePersist
    public void logTime() {
        Date temp = new Date();
        Object param = new java.sql.Timestamp(temp.getTime());
        createAt = (Date) param;
        updateAt = (Date) param;
    }

    @PreUpdate
    public void logUpdate() {
        Date temp = new Date();
        Object param = new java.sql.Timestamp(temp.getTime());
        updateAt = (Date) param;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean getEmailVerified() { return emailVerified; }

    public void setEmailVerified(boolean emailVerified) { this.emailVerified = emailVerified; }

    public Date getCreateAt() { return createAt; }

    public Date getUpdateAt() { return updateAt; }
}