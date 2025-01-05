package com.seroter.school_management.respository;

import java.util.List;
import java.util.Optional;

import com.seroter.school_management.models.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import com.seroter.school_management.models.Student;
import com.seroter.school_management.utils.House;

public interface StudentRepository extends MongoRepository<Student, String> {
    Optional<Student> findById(@Param("id") String id);
    Student findByUserName(String userName);
    List<Student> findByHouse(House house);

    @Query("{ 'name': { $regex: ?0, $options: 'i' } }")
    List<Student> findByNameContainingIgnoreCase(String name);
    List<Student> findByClassName(String className);

    List<Student> findStudentsByIsSeated(boolean isSeated);
    
    @Query("{'house': ?0, 'className': ?1}")
    List<Student> findByHouseAndClassName(House house, String className);
    
}
