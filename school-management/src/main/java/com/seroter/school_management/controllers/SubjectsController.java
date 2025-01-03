package com.seroter.school_management.controllers;

import com.seroter.school_management.models.Subject;
import com.seroter.school_management.services.SubjectsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/subjects")
@CrossOrigin
public class SubjectsController {
    @Autowired
    SubjectsService subjectsService;

    @GetMapping
    public List<Subject> getAllSubjects() {
        return subjectsService.getAllSubjects();
    }

    @PostMapping
    public ResponseEntity<Subject> createSubject(@RequestBody Subject subject){
        Subject subject1 = subjectsService.createSubject(subject);
        return new ResponseEntity<>(subject1, HttpStatus.CREATED);
    }

}
