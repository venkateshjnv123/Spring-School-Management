package com.seroter.school_management.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seroter.school_management.models.Classroom;
import com.seroter.school_management.respository.ClassroomRepository;

@Service
public class ClassroomService {
    @Autowired
    ClassroomRepository classroomRepository;

    public List<Classroom> getAllClassrooms(){
        return classroomRepository.findAll();
    }

    public Classroom postClassroom(Classroom classroom){
        classroomRepository.save(classroom);
        return classroom;
    }
}
