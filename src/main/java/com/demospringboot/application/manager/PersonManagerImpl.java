package com.demospringboot.application.manager;

import com.demospringboot.application.dto.PersonDTO;
import com.demospringboot.domain.OrikaBeanMapper;
import com.demospringboot.domain.dao.PersonDAO;
import com.demospringboot.domain.model.Person;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonManagerImpl implements PersonManager {

    private final PersonDAO personDAO;

    private final OrikaBeanMapper orikaBeanMapper;

    public PersonManagerImpl(OrikaBeanMapper orikaBeanMapper, PersonDAO personDAO) {
        this.orikaBeanMapper = orikaBeanMapper;
        this.personDAO = personDAO;
    }

    public List<PersonDTO> findAll() {
        return orikaBeanMapper.mapAsList(personDAO.findAll(), PersonDTO.class);
    }

    public PersonDTO findById(Long id) {
        Person person = personDAO.findById(id).orElse(null);
        return orikaBeanMapper.map(person, PersonDTO.class);
    }
}
