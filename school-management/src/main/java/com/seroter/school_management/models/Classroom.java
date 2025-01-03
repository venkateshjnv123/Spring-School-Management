package com.seroter.school_management.models;

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
@Document(collection = "classroom")
public class Classroom {
    @Id
    private String id;
    private String roomName; 
    private int rows; 
    private int columns; 
}
