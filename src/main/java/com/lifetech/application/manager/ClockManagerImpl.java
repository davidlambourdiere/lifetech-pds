package com.lifetech.application.manager;

import com.lifetech.application.dto.ClockDTO;
import com.lifetech.domain.OrikaBeanMapper;
import com.lifetech.domain.dao.ClockDAO;
import com.lifetech.domain.dao.RoomDAO;
import com.lifetech.domain.model.Clock;
import com.lifetech.domain.model.Room;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClockManagerImpl implements  ClockManager {

    private final ClockDAO clockDAO;

    private final RoomDAO roomDao;


    private final OrikaBeanMapper orikaBeanMapper;

    public ClockManagerImpl(ClockDAO clockDAO, RoomDAO roomDao, OrikaBeanMapper orikaBeanMapper) {
        this.clockDAO = clockDAO;
        this.roomDao = roomDao;
        this.orikaBeanMapper = orikaBeanMapper;
    }


    @Override
    public ClockDTO findById(String id) {
        Clock clock = clockDAO.findById(Long.parseLong(id)).orElse(null);
        return orikaBeanMapper.map(clock, ClockDTO.class);
    }

    @Override
    public List<ClockDTO> findByRoom(String id) {
        Room room = roomDao.findById(Long.parseLong(id)).orElse(null);
        List<Clock> clocks = clockDAO.findByRoom(room);
        return orikaBeanMapper.mapAsList(clocks, ClockDTO.class);
    }


}
