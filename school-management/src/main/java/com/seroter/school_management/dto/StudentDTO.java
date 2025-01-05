package com.seroter.school_management.dto;

import com.seroter.school_management.utils.House;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
public class StudentDTO {
    private String id;
    private String name;
    private String rollNumber;
    private String className;
    private House house;
    private List<String> subjectIds;
    private boolean isSeated;
    private Map<String, Integer> scores;
    @Indexed(unique = true)
    @NonNull
    private String userName;
    private String role;
    private List<String> enrolSubjectNames;
}
