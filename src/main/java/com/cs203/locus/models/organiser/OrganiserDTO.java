package com.cs203.locus.models.organiser;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

public class OrganiserDTO implements Serializable {

    private static final long serialVersionUID = -57651050556269804L;

    @NotNull
    private Integer id;

    private String companyName;

    private String companyAcra;

    private String companySector;

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id;}

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyAcra() { return companyAcra; }

    public void setCompanyAcra(String companyAcra) {
        this.companyAcra = companyAcra;
    }

    public String getCompanySector() {
        return companySector;
    }

    public void setCompanySector(String companySector) {
        this.companySector = companySector;
    }

}
