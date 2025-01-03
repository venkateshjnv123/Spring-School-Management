package com.seroter.school_management.controllers;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seroter.school_management.dto.SeatingArrangementDTO;
import com.seroter.school_management.models.SeatingArrangement;
import com.seroter.school_management.services.SeatingArragementService;

@RestController
@RequestMapping("/class")
public class SeatingArrangementController {

    @Autowired
    SeatingArragementService seatingArrangementService;

    @GetMapping("/{classId}")
    public List<SeatingArrangement> getSeatArrangementsOfClass(@PathVariable("classId") ObjectId classId) {
        return seatingArrangementService.getSeatArrangementsOfClass(classId);
    }

    @PostMapping("/{classId}")
    public SeatingArrangement postSeatingArrangement(@PathVariable("classId") ObjectId classId, @RequestBody SeatingArrangementDTO seatingArrangementDTO) {
        ObjectId studentId = new ObjectId(seatingArrangementDTO.getStudentId());
        return seatingArrangementService.postSeatingArrangement(studentId, classId, seatingArrangementDTO.getRow(), seatingArrangementDTO.getColumn());
    }

    @DeleteMapping("/{classId}/student/{studentId}")
    public String deleteSeatingArrangement(@PathVariable("classId") ObjectId classId, @PathVariable("studentId") ObjectId studentId) {
        seatingArrangementService.deleteSeatingArrangement(studentId, classId);
        return "Deletion Successfuly";
    }
    
}
