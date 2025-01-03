package com.seroter.school_management.respository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.seroter.school_management.models.SeatingArrangement;

public interface SeatingArrangementRepository extends MongoRepository<SeatingArrangement, String>{
    List<SeatingArrangement> findByClassId(String classId);
    List<SeatingArrangement> findByStudentId(String studentId);
    List<SeatingArrangement> findByClassIdAndStudentId(String classId, String studentId);
    void deleteByStudentIdAndClassId(String studentId, String classId);
}
