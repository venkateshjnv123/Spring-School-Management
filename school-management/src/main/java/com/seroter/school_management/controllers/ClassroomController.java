package com.seroter.school_management.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.seroter.school_management.models.Classroom;
import com.seroter.school_management.services.ClassroomService;

@RequestMapping("/classroom")
@RestController
@CrossOrigin
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
