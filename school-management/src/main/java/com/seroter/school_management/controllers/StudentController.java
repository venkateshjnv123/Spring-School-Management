package com.seroter.school_management.controllers;

import java.util.List;
import java.util.Optional;

import com.seroter.school_management.dto.ResponseDTO;
import com.seroter.school_management.dto.ScoresDTO;
import com.seroter.school_management.dto.SubjectsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.seroter.school_management.models.Student;
import com.seroter.school_management.services.StudentService;
import com.seroter.school_management.utils.House;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {
    @Autowired
    StudentService studentService;

    @GetMapping
    public List<Student> getStudents(){
        return studentService.getAllStudents();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Student>> searchStudents(@RequestParam String name) {
        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.ok(studentService.getAllStudents());
        }
        List<Student> students = studentService.searchStudentsByName(name);
        return ResponseEntity.ok(students);
    }

    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student){
        Student newStud= studentService.createStudent(student);
        return new ResponseEntity<>(newStud,HttpStatus.CREATED);
    }

    @PostMapping("/{id}/enroll")
    public ResponseEntity<Student> enrollToSubject(@PathVariable("id") String id, @RequestBody SubjectsDTO subjectsDTO) {
        Student newStud = studentService.enrollToSubject(id, subjectsDTO.getSubjectId());
        return new ResponseEntity<>(newStud,HttpStatus.CREATED);
    }

    @GetMapping("/getNotSeatedStudents/{isSeated}")
    public List<Student> getStudentsNotSeated(@PathVariable("isSeated") boolean isSeated){
        return studentService.findStudentNotSeated(isSeated);
    }

    @PutMapping("/{id}/add-score")
    public Student addScore(@PathVariable("id") String id, @RequestBody ScoresDTO scoresDTO) {
        String subjectId = scoresDTO.getSubjectId();
        Integer score = scoresDTO.getScore();
        return studentService.addScore(id, subjectId, score);
    }

    @GetMapping("/{id}")
    public Optional<Student> getStudentById(@PathVariable("id") String id){
        return studentService.findStudentById(id);
    }

    @GetMapping("/userName/{userName}")
    public Optional<Student> getStudentByUserName(@PathVariable("userName") String userName){
        return Optional.ofNullable(studentService.findByUserName(userName));
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
