package com.seroter.school_management.respository;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import com.seroter.school_management.models.Student;
import com.seroter.school_management.utils.House;

public interface StudentRepository extends MongoRepository<Student, ObjectId> {
    Optional<Student> findById(@Param("id") ObjectId id);
    
    List<Student> findByHouse(House house);
    
    List<Student> findByClassName(String className);

    List<Student> findByIsSeated(boolean isSeated);
    
    @Query("{'house': ?0, 'className': ?1}")
    List<Student> findByHouseAndClassName(House house, String className);
    
}
