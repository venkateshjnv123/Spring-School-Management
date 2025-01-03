package com.seroter.school_management.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "seating_arrangements")
public class SeatingArrangement {
    @Id
    private String id;
    private ObjectId studentId; 
    private ObjectId classId;    
    private int row;
    private int column;
    private boolean isSeated;

}
