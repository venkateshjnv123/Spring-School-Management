package com.seroter.school_management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeatingArrangementDTO {
    private String studentId;
    private String classId;
    private String className;
    private int row;
    private int column;
    private boolean isSeated;
}
