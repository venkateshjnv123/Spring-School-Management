package com.seroter.school_management.models;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "seating_arrangements")
public class SeatingArrangement {
    @Id
    private String id;
    private String studentId;
    private String classId;
    private int row;
    private int column;
    private boolean isSeated;

}
