package com.lifetech.application.manager;

import com.lifetech.application.dto.StrapDTO;
import com.lifetech.application.dto.StrapDetailDTO;
import com.lifetech.domain.OrikaBeanMapper;
import com.lifetech.domain.dao.StrapDAO;
import com.lifetech.domain.dao.StrapHistoricDAO;
import com.lifetech.domain.model.Strap;
import com.lifetech.domain.model.StrapHistoric;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Service
public class StrapManagerImpl implements StrapManager {


    private final StrapDAO strapDAO;

    private final StrapHistoricDAO strapHistoricDAO;

    private final OrikaBeanMapper orikaBeanMapper;

    public StrapManagerImpl(StrapHistoricDAO strapHistoricDAO, StrapDAO strapDAO, OrikaBeanMapper orikaBeanMapper) {
        this.strapHistoricDAO = strapHistoricDAO;
        this.strapDAO = strapDAO;
        this.orikaBeanMapper = orikaBeanMapper;
    }
    @Override
    public StrapDetailDTO findByHistoric(String id) {
        Strap strap = strapDAO.findById(Long.parseLong(id)).orElse(null);
        StrapDTO strapDTO = orikaBeanMapper.map(strap, StrapDTO.class);
        List<StrapHistoric> strapHistorics = strapHistoricDAO.findAllByStrapId(Long.parseLong(id));
        LocalDate d = LocalDate.now().minusMonths(1);
        String percentageLastMonth = null;
        if (strapHistorics != null && !strapHistorics.isEmpty()) {
            int timeOn = 0;
            int timeOff = 0;
            for (StrapHistoric strapHistoric : strapHistorics) {
                if ((Instant.ofEpochMilli(strapHistoric.getStartDate().getTime())
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate()).isAfter(d)) {
                    if (strapHistoric.getState().equals("on")) {
                        timeOn = timeOn + (int) (strapHistoric.getEndingDate().getTime()/100000 - strapHistoric.getStartDate().getTime()/100000);
                    } else if (strapHistoric.getState().equals("off")) {
                        timeOff = timeOff + (int) (strapHistoric.getEndingDate().getTime()/100000 - strapHistoric.getStartDate().getTime()/100000);
                    }
                }
            }
            int totalTime = timeOn + timeOff;
            float percentageOnLastMonth = ((float)timeOn / (float)totalTime)*100;
            percentageLastMonth = String.valueOf(percentageOnLastMonth);
        }
        StrapDetailDTO strapDetailDTO = new StrapDetailDTO();
        strapDetailDTO.setPercentageOnLastMonth(percentageLastMonth);
        strapDetailDTO.setStrap(strapDTO);
        return strapDetailDTO;
    }
}
