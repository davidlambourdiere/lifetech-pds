package com.lifetech.application.manager;

import com.lifetech.application.dto.SubscriptionDTO;
import com.lifetech.domain.model.Subscription;

import java.util.List;

public interface SubscriptionManager {

    SubscriptionDTO findSubscriptionById(Long subscriptionId);

    SubscriptionDTO findSubscriptionByProfile(String subscriptionName);

    //Dont work for the moment
   // SubscriptionDTO sumPrice(String subscriptionName, List<String> typeList, List<String> serviceList);


}
