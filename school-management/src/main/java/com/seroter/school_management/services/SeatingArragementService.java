package com.seroter.school_management.services;

import java.util.List;
import java.util.stream.Collectors;

import com.seroter.school_management.dto.SeatingArrangementDTO;
import com.seroter.school_management.models.Classroom;
import com.seroter.school_management.respository.ClassroomRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.seroter.school_management.models.SeatingArrangement;
import com.seroter.school_management.models.Student;
import com.seroter.school_management.respository.SeatingArrangementRepository;
import com.seroter.school_management.respository.StudentRepository;

import javax.management.Query;

@Service
public class SeatingArragementService {
    @Autowired
    SeatingArrangementRepository seatingArrangementRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    ClassroomRepository classroomRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<SeatingArrangement> getSeatArrangementsOfClass(String classId) {
        return seatingArrangementRepository.findByClassId(classId);
    }

    public List<SeatingArrangementDTO> getSeatArrangementOfStudent(String studentId){
        List<SeatingArrangement> seatingArrangements = seatingArrangementRepository.findByStudentId(studentId);

        // For each SeatingArrangement, add the corresponding className
        return seatingArrangements.stream()
                .map(seating -> {
                    // Fetch the classroom by classId
                    Classroom classroom = classroomRepository.findById(seating.getClassId()).orElse(null);

                    // Create a DTO to send back with className
                    SeatingArrangementDTO seatingArrangementDTO = SeatingArrangementDTO
                            .builder()
                            .studentId(seating.getStudentId())
                            .className(classroom != null ? classroom.getRoomName() : "Not alloted")
                            .row(seating.getRow())
                            .column(seating.getColumn())
                            .build();
                    return  seatingArrangementDTO;
                })
                .collect(Collectors.toList());
}

    public SeatingArrangement postSeatingArrangement(String studentId, String classId, int row, int column) {
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

    public void deleteSeatingArrangement(String studentId, String classId) {
        seatingArrangementRepository.deleteByStudentIdAndClassId(studentId, classId);
    }

    public void deleteSeating(String seatingId){
        seatingArrangementRepository.deleteById(seatingId);
    }
}
