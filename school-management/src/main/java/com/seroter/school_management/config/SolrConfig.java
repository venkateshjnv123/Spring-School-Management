package com.seroter.school_management.config;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.impl.Http2SolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SolrConfig {
    @Value("${solr.host}")
    private String solrHost;

    @Bean
    public SolrClient solrClient() {
        try {
            HttpSolrClient solrClient = new HttpSolrClient.Builder(solrHost)
                    .withConnectionTimeout(10000)  // Optional timeout settings
                    .withSocketTimeout(60000)      // Optional socket timeout settings
                    .build();
            return solrClient;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}