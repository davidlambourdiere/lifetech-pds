package com.lifetech.application.manager;

import com.lifetech.application.dto.IOTDTO;

public interface IOTManager {
    IOTDTO findAllIOT();

    IOTDTO findIOTByType(String type);
}
