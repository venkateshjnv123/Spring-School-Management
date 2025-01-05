package com.seroter.school_management.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ClassroomDTO {
    private String id;
    private String roomName;
    private int rows;
    private int columns;
    private int seatsRemaining;
}
