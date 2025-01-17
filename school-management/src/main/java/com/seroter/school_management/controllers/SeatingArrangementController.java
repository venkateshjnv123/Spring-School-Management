package com.seroter.school_management.controllers;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.seroter.school_management.dto.SeatingArrangementDTO;
import com.seroter.school_management.models.SeatingArrangement;
import com.seroter.school_management.services.SeatingArragementService;

@RestController
@RequestMapping("/class")
@CrossOrigin
public class SeatingArrangementController {

    @Autowired
    SeatingArragementService seatingArrangementService;

    @GetMapping("/{classId}")
    public List<SeatingArrangement> getSeatArrangementsOfClass(@PathVariable("classId") String classId) {
        return seatingArrangementService.getSeatArrangementsOfClass(classId);
    }

    @GetMapping("/student/{studentId}")
    public List<SeatingArrangementDTO> getSeatArrangementsOfStudent(@PathVariable("studentId") String studentId) {
        return seatingArrangementService.getSeatArrangementOfStudent(studentId);
    }

    @PostMapping("/postSeating/{classId}")
    public SeatingArrangement postSeatingArrangement(@PathVariable("classId") String classId, @RequestBody SeatingArrangementDTO seatingArrangementDTO) {
        String studentId = seatingArrangementDTO.getStudentId();
        return seatingArrangementService.postSeatingArrangement(studentId, classId, seatingArrangementDTO.getRow(), seatingArrangementDTO.getColumn());
    }

    @DeleteMapping("/{seatingId}/student/{studentId}")
    public String deleteSeatingArrangement(@PathVariable("seatingId") String seatingId, @PathVariable("studentId") String studentId) {
        seatingArrangementService.deleteSeatingArrangement(studentId, seatingId);
        return "Deletion Successfully";
    }

    @DeleteMapping("/{seatingId}")
    public String deleteSeating(@PathVariable("seatingId") String seatingId){
        seatingArrangementService.deleteSeating(seatingId);
        return "Deletion Successful";
    }
}
