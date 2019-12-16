package com.lifetech.domain.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity(name="healthhistoric")
public class HealthHistoric extends PersistableElement{

    @Column(name="hearthrate")
    private String hearthrate;

    @Column(name="systolic")
    private String systolic;

    @Column(name="diastolic")
    private String diastolic;

    @Column(name="sugarlevel")
    private String sugarlevel;

    @Column(name="stepcounter")
    private String stepcounter;

    @ManyToOne(cascade = CascadeType.ALL)
    private Strap strap;

    public HealthHistoric(String hearthrate, String systolic, String diastolic, String sugarlevel, String stepcounter, Strap strap) {
        this.hearthrate = hearthrate;
        this.systolic = systolic;
        this.diastolic = diastolic;
        this.sugarlevel = sugarlevel;
        this.stepcounter = stepcounter;
        this.strap = strap;
    }

    public HealthHistoric(){}


    public String getHearthrate() {
        return hearthrate;
    }

    public void setHearthrate(String hearthrate) {
        this.hearthrate = hearthrate;
    }

    public String getSystolic() {
        return systolic;
    }

    public void setSystolic(String systolic) {
        this.systolic = systolic;
    }

    public String getDiastolic() {
        return diastolic;
    }

    public void setDiastolic(String diastolic) {
        this.diastolic = diastolic;
    }

    public String getSugarlevel() {
        return sugarlevel;
    }

    public void setSugarlevel(String sugarlevel) {
        this.sugarlevel = sugarlevel;
    }

    public String getStepcounter() {
        return stepcounter;
    }

    public void setStepcounter(String stepcounter) {
        this.stepcounter = stepcounter;
    }

    public Strap getStrap() {
        return strap;
    }

    public void setStrap(Strap strap) {
        this.strap = strap;
    }

    public void removeStrap() {
        this.strap = null;
    }

    @Override
    public String toString() {
        return "HealthHistoric{" +
                "hearthrate='" + hearthrate + '\'' +
                ", systolic='" + systolic + '\'' +
                ", diastolic='" + diastolic + '\'' +
                ", sugarlevel='" + sugarlevel + '\'' +
                ", stepcounter='" + stepcounter + '\'' +
                '}';
    }
}
