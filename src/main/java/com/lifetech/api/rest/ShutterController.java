package com.lifetech.api.rest;

import com.lifetech.application.dto.ShutterDTO;
import com.lifetech.application.manager.ShutterManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ShutterController extends RestBaseController{

    private final ShutterManager shutterManager;

    public ShutterController(ShutterManager shutterManager) {
        this.shutterManager = shutterManager;
    }

    @GetMapping("shutter/{id}")
    private ShutterDTO findById(@PathVariable("id") String id){
        return null;
    }
}
