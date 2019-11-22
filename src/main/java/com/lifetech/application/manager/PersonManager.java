package com.lifetech.application.manager;

import com.lifetech.application.dto.PersonDTO;

import java.util.List;

public interface PersonManager {
    List<PersonDTO> findAll();

    boolean verifyConnexion(PersonDTO connectedLogs);
}
