package com.seroter.school_management.controllers;

import com.seroter.school_management.services.SolrIndexingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheck {

    @Autowired
    SolrIndexingService solrIndexingService;
    @GetMapping("/health")
    public String health(){
        return "Health is ok";
    }
}
