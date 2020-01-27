package com.lifetech.domain.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.sql.Timestamp;

@Entity(name="heater")
public class Heater  extends IOT{
    @Column(name = "minvalueref")
    private String minvalueref;
    @Column(name = "maxvalueref")
    private String maxvalueref;
    @Column(name = "state")
    private String state;
    @Column(name = "temperature")
    private String temperature;


    @ManyToOne(cascade = CascadeType.ALL)
    private Person person;

    @ManyToOne(cascade = CascadeType.ALL)
    private Room room;

    public Heater(Double price, String status, String state, String ipadress, Timestamp startdate, String minvalueref, String maxvalueref, String suspect, Timestamp activityduration, Person person, Room room, String temperature) {
        super(price, status, state, ipadress, startdate, minvalueref, maxvalueref, suspect, activityduration);
        this.person = person;
        this.room = room;
        this.state = state;
        this.minvalueref = minvalueref;
        this.maxvalueref = maxvalueref;
        this.temperature = temperature;
    }

    public Heater() {
    }

    @Override
    public void setMinvalueref(String minvalueref) {
        this.minvalueref = minvalueref;
    }

    @Override
    public void setMaxvalueref(String maxvalueref) {
        this.maxvalueref = maxvalueref;
    }

    @Override
    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String getMinvalueref() {
        return minvalueref;
    }

    @Override
    public String getMaxvalueref() {
        return maxvalueref;
    }

    @Override
    public String getState() {
        return state;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Room getRoom() { return room; }

    public void setRoom(Room room) { this.room = room; }

    public String getTemperature() {
        return temperature;
    }

    public void setTemperature(String temperature) {
        this.temperature = temperature;
    }
}
