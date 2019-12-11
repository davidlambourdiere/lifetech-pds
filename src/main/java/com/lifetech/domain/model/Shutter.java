package com.lifetech.domain.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.sql.Timestamp;

@Entity(name="shutter")
public class Shutter extends IOT{

    @Column(name = "percentage")
    private String percentage;

    @ManyToOne(cascade = CascadeType.ALL)
    private Person person;

    public Shutter(String status, String state, Timestamp startdate, String minvalueref, String maxvalueref, Timestamp activityduration, String percentage, Person person) {
        super(status, state, startdate, minvalueref, maxvalueref, activityduration);
        this.percentage = percentage;
        this.person = person;
    }

    public Shutter() {
    }

    public String getPercentage() {
        return percentage;
    }

    public void setPercentage(String percentage) {
        this.percentage = percentage;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}
