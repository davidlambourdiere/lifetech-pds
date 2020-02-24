package com.lifetech.application.manager;

import com.lifetech.application.dto.StrapDetailDTO;
import com.lifetech.domain.model.Strap;

import java.util.List;

public interface StrapManager {
    StrapDetailDTO findByHistoric(String id);

    List<Strap> findAllStrapMalFunctionning();
}
