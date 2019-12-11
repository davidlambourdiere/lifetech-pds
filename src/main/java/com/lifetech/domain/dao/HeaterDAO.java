package com.lifetech.domain.dao;

import com.lifetech.domain.model.Heater;
import com.lifetech.domain.model.Person;
import com.lifetech.domain.model.Residence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeaterDAO extends JpaRepository<Heater, Long> {
    Long countByPerson(Person person);

    //List<Heater> findAllByResidence(Residence residence);
}
