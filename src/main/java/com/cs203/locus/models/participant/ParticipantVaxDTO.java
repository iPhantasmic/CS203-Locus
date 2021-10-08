package com.cs203.locus.models.participant;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

public class ParticipantVaxDTO implements Serializable {

    private static final long serialVersionUID = -8661467404585749884L;

    @NotBlank
    private Integer id;

    @NotBlank
    private String name;

    @NotBlank
    private boolean vaxStatus;

    private String vaxGcsUrl;

    private final boolean petStatus = true;

    public ParticipantVaxDTO(Integer id, String name, boolean vaxStatus, String vaxGcsUrl) {
        this.id = id;
        this.name = name;
        this.vaxStatus = vaxStatus;
        this.vaxGcsUrl = vaxGcsUrl;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id;}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public void setVaxStatus(boolean vaxStatus){
        this.vaxStatus = vaxStatus;
    }
    public boolean getVaxStatus(){
        return vaxStatus;
    }

    public String getVaxGcsUrl(){
        return vaxGcsUrl;
    }
    public void setVaxGcsUrl(String vaxGcsUrl) { this.vaxGcsUrl = vaxGcsUrl; }

}