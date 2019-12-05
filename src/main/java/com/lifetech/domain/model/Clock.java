package com.lifetech.domain.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.sql.Timestamp;

@Entity(name="clock")
public class Clock extends IOT {

    @Column(name="time")
    private Timestamp time;

    @ManyToOne(cascade = CascadeType.ALL)
    private Person person;

    public Clock(String status, String state, Timestamp startdate, String minvalueref, String maxvalueref, Timestamp activityduration, Timestamp time, Person person) {
        super(status, state, startdate, minvalueref, maxvalueref, activityduration);
        this.time = time;
        this.person = person;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}
