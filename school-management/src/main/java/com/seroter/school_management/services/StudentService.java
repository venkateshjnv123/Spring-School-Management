package com.seroter.school_management.services;

import java.util.*;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.seroter.school_management.models.Student;
import com.seroter.school_management.respository.StudentRepository;
import com.seroter.school_management.utils.House;

@Service
@Component
public class StudentService {
    @Autowired
    StudentRepository studentRepository;

    public Student createStudent(Student student){
        studentRepository.save(student);
        return student;
    }

    public Student enrollToSubject(String studentId, String subjectId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (student.getSubjectIds() == null) {
            student.setSubjectIds(new ArrayList<>());
        }

        if (!student.getSubjectIds().contains(subjectId)) {
            student.getSubjectIds().add(subjectId);
        } else {
            throw new IllegalArgumentException("Student already enrolled in the subject");
        }

        return studentRepository.save(student);
    }

    public List<Student> getAllStudents(){
        return studentRepository.findAll(); 
    }

    public List<Student> findStudentNotSeated(boolean isSeated){
        return studentRepository.findStudentsByIsSeated(isSeated);
    }

    public List<Student> searchStudentsByName(String name) {
        return studentRepository.findByNameContainingIgnoreCase(name);
    }

    public Optional<Student> findStudentById(String id) {
        return studentRepository.findById(id);
    }

    public List<Student> findStudentsByHouse(House house) {
        return studentRepository.findByHouse(house);
    }

    public List<Student> findStudentsByClassName(String className) {
        return studentRepository.findByClassName(className);
    }

    public List<Student> findStudentsByHouseAndClass(House house, String className) {
        return studentRepository.findByHouseAndClassName(house, className);
    }

    public Student addScore(String studentId, String subjectId, Integer score) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (!student.getSubjectIds().contains(subjectId)) {
            throw new IllegalArgumentException("Student not enrolled in the subject");
        }

        if (student.getScores() == null) {
            student.setScores(new HashMap<>());
        }
        student.getScores().put(subjectId, score);
        return studentRepository.save(student);
    }

    public Student findByUserName(String userName){
        return studentRepository.findByUserName(userName);
    }
}
