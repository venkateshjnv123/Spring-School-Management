package com.seroter.school_management.respository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.seroter.school_management.models.SeatingArrangement;

public interface SeatingArrangementRepository extends MongoRepository<SeatingArrangement, ObjectId>{
    List<SeatingArrangement> findByClassId(ObjectId classId);
    List<SeatingArrangement> findByClassIdAndStudentId(ObjectId classId, ObjectId studentId);
    void deleteByStudentIdAndClassId(ObjectId studentId, ObjectId classId);
}
