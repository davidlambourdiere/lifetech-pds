package com.lifetech.domain.service;

import com.lifetech.domain.model.Person;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonServiceImpl implements PersonService{

    public boolean verifyConnection(List<Person> people, Person person) {
        for (Person personToCheck: people){
            if(personToCheck.getLogin().equals(person.getLogin())){
                if(personToCheck.getPassword().equals(person.getPassword())){
                    return true;
                }
            }
        }
        return false;
    }
}
