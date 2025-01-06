package com.seroter.school_management.services;

import com.seroter.school_management.models.Student;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.common.SolrInputDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class SolrIndexingService {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private SolrClient solrClient;

    public void indexStudentsToSolr() {
        List<Student> students = mongoTemplate.findAll(Student.class);
        List<SolrInputDocument> solrDocs = new ArrayList<>();
        System.out.println("Yes");
        for (Student student : students) {
            SolrInputDocument doc = new SolrInputDocument();
            doc.addField("id", student.getId());
            doc.addField("name", student.getName());
            doc.addField("rollNumber", student.getRollNumber());
            doc.addField("className", student.getClassName());
            solrDocs.add(doc);
        }

        try {
            solrClient.add("students_core", solrDocs);
            solrClient.commit("students_core");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
