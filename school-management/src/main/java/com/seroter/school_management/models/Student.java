package com.seroter.school_management.models;

import java.util.Calendar;
import java.util.List;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.seroter.school_management.utils.House;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "students")
public class Student {
    @Id
    private ObjectId id;
    private String name;
    private String rollNumber;
    private String className;
    private House house; 
    private List<String> subjectIds;
    private boolean isSeated;
    private Map<String, Integer> scores;
}
