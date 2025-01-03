package com.seroter.school_management.services;

import com.seroter.school_management.models.Student;
import com.seroter.school_management.models.Subject;
import com.seroter.school_management.respository.SubjectsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectsService {
    @Autowired
    SubjectsRepository subjectsRepository;

    public List<Subject> getAllSubjects() {
        return subjectsRepository.findAll();
    }

    public Subject createSubject(Subject subject){
        return subjectsRepository.save(subject);
    }
}
