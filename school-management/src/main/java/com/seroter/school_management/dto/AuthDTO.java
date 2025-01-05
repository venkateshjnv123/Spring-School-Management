package com.seroter.school_management.dto;

import com.seroter.school_management.models.Student;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthDTO {
    private String userName;
    private String role;
    private Student student;
    private String token;
}
