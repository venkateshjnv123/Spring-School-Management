package com.seroter.school_management.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seroter.school_management.models.Classroom;
import com.seroter.school_management.services.ClassroomService;

@RequestMapping("/classroom")
@RestController
public class ClassroomController {
    
    @Autowired
    ClassroomService classroomService;

    @GetMapping
    public List<Classroom> getAllClassrooms(){
        return classroomService.getAllClassrooms();
    }

    @PostMapping
    public Classroom postClassroom(@RequestBody Classroom classroom){
        return classroomService.postClassroom(classroom);
    }
}
