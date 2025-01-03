package com.seroter.school_management.dto;

import lombok.*;

import java.util.Map;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScoresDTO {
    private String subjectId;
    private int score;
}
