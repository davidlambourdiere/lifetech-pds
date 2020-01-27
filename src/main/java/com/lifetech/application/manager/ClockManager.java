package com.lifetech.application.manager;

import com.lifetech.application.dto.ClockDTO;
import com.lifetech.domain.model.Room;

import java.util.List;

public interface ClockManager {
    ClockDTO findById(String id);

    List<ClockDTO> findByRoom(String id);
}
