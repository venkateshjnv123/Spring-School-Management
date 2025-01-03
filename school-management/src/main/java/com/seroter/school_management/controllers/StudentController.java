package com.seroter.school_management.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.seroter.school_management.dto.ScoresDTO;
import com.seroter.school_management.dto.SubjectsDTO;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.seroter.school_management.models.Student;
import com.seroter.school_management.services.StudentService;
import com.seroter.school_management.utils.House;

@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    StudentService studentService;

    @GetMapping
    public List<Student> getStudents(){
        return studentService.getAllStudents();
    }

    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student){
        Student newStud= studentService.createStudent(student);
        return new ResponseEntity<>(newStud,HttpStatus.CREATED);
    }

    @PostMapping("/{id}/enroll")
    public ResponseEntity<Student> enrollToSubject(@PathVariable("id") ObjectId id, @RequestBody SubjectsDTO subjectsDTO) {
        Student newStud = studentService.enrollToSubject(id, subjectsDTO.getSubjectId());
        return new ResponseEntity<>(newStud,HttpStatus.CREATED);
    }

    @GetMapping("/getNotSeatedStudents/{isSeated}")
    public List<Student> getStudentsNotSeated(@PathVariable("isSeated") boolean isSeated){
        return studentService.findStudentNotSeated(isSeated);
    }

    @PutMapping("/{id}/add-score")
    public Student addScore(@PathVariable("id") ObjectId id, @RequestBody ScoresDTO scoresDTO) {
        String subjectId = scoresDTO.getSubjectId();
        Integer score = scoresDTO.getScore();
        return studentService.addScore(id, subjectId, score);
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable("id") ObjectId id){
        System.out.println(id);
        return studentService.findStudentById(id).orElse(null);
    }

    @GetMapping("/house/{house}")
    public List<Student> getStudentsByHouse(@PathVariable("house") House house) {
        return studentService.findStudentsByHouse(house);
    }

    @GetMapping("/class/{className}")
    public List<Student> getStudentsByClassName(@PathVariable("className") String className) {
        return studentService.findStudentsByClassName(className);
    }

    @GetMapping("/house/{house}/class/{className}")
    public List<Student> getStudentsByHouseAndClass(@PathVariable("house") House house, @PathVariable("className") String className) {
        return studentService.findStudentsByHouseAndClass(house, className);
    }
}
