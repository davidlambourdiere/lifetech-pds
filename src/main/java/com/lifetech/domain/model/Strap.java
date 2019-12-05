package com.lifetech.domain.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import java.sql.Timestamp;

@Entity(name="strap")
public class Strap extends IOT{


    @Column(name="minsysto")
    private String minsysto;

    @Column(name="maxsysto")
    private String maxsysto;

    @Column(name="maxdiasto")
    private String maxdiasto;

    @Column(name="minglyc")
    private String minglyc;

    @Column(name="maxglyc")
    private String maxglyc;

    @Column(name="minsteps")
    private String minsteps;

    @OneToOne
    private Person person;

    public Strap(String status, String state, Timestamp startdate, String minvalueref, String maxvalueref, Timestamp activityduration, String minsysto, String maxsysto, String maxdiasto, String minglyc, String maxglyc, String minsteps, Person person) {
        super(status, state, startdate, minvalueref, maxvalueref, activityduration);
        this.minsysto = minsysto;
        this.maxsysto = maxsysto;
        this.maxdiasto = maxdiasto;
        this.minglyc = minglyc;
        this.maxglyc = maxglyc;
        this.minsteps = minsteps;
        this.person = person;
    }

    public String getMinsysto() {
        return minsysto;
    }

    public void setMinsysto(String minsysto) {
        this.minsysto = minsysto;
    }

    public String getMaxsysto() {
        return maxsysto;
    }

    public void setMaxsysto(String maxsysto) {
        this.maxsysto = maxsysto;
    }

    public String getMaxdiasto() {
        return maxdiasto;
    }

    public void setMaxdiasto(String maxdiasto) {
        this.maxdiasto = maxdiasto;
    }

    public String getMinglyc() {
        return minglyc;
    }

    public void setMinglyc(String minglyc) {
        this.minglyc = minglyc;
    }

    public String getMaxglyc() {
        return maxglyc;
    }

    public void setMaxglyc(String maxglyc) {
        this.maxglyc = maxglyc;
    }

    public String getMinsteps() {
        return minsteps;
    }

    public void setMinsteps(String minsteps) {
        this.minsteps = minsteps;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}
