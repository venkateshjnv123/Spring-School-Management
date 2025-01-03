package com.seroter.school_management.services;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seroter.school_management.models.SeatingArrangement;
import com.seroter.school_management.models.Student;
import com.seroter.school_management.respository.SeatingArrangementRepository;
import com.seroter.school_management.respository.StudentRepository;

@Service
public class SeatingArragementService {
    @Autowired
    SeatingArrangementRepository seatingArrangementRepository;

    @Autowired
    StudentRepository studentRepository;

    public List<SeatingArrangement> getSeatArrangementsOfClass(ObjectId classId) {
        return seatingArrangementRepository.findByClassId(classId);
    }

    public SeatingArrangement postSeatingArrangement(ObjectId studentId, ObjectId classId, int row, int column) {
        SeatingArrangement seatingArrangement = new SeatingArrangement();
        seatingArrangement.setStudentId(studentId);
        seatingArrangement.setClassId(classId);
        seatingArrangement.setRow(row);
        seatingArrangement.setColumn(column);
        seatingArrangementRepository.save(seatingArrangement);

        Student student = studentRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
        student.setSeated(true);  

        studentRepository.save(student);

        return seatingArrangement;
    }

    public void deleteSeatingArrangement(ObjectId studentId, ObjectId classId) {
        seatingArrangementRepository.deleteByStudentIdAndClassId(studentId, classId);
    }
}
