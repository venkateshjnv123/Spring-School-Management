package com.seroter.school_management.respository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.seroter.school_management.models.Classroom;

public interface ClassroomRepository extends MongoRepository<Classroom, ObjectId> {
    
}
