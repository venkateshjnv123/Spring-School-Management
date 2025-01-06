package com.seroter.school_management.controllers;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
public class SearchController {
    @Autowired
    private SolrClient solrClient;

    @GetMapping("/students")
    public ResponseEntity<?> searchStudents(@RequestParam("query") String query) {
        SolrQuery solrQuery = new SolrQuery();
        if (query == null || query.trim().isEmpty()) {
            solrQuery.setQuery("*:*");
        } else {
            solrQuery.setQuery("name:" + query + "~2");
        }
        solrQuery.set("fl", "id,name,className,rollNumber,house,userName");

        try {
            QueryResponse response = solrClient.query("students_core", solrQuery);
            return ResponseEntity.ok(response.getResults());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Search failed");
        }
    }
}
