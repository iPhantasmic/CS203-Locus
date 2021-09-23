package com.cs203.creditswees.models.organiser;

import java.io.Serializable;

public class OrganiserDTO implements Serializable {

    private String companyName;

    private String companyAcra;

    private String companySector;

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyAcra() {
        return companyAcra;
    }

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
