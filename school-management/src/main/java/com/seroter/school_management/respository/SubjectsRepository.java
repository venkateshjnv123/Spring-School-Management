package com.seroter.school_management.respository;

import com.seroter.school_management.models.Subject;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SubjectsRepository extends MongoRepository<Subject, ObjectId> {
}
