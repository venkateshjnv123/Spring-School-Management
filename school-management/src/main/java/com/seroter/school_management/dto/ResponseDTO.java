package com.seroter.school_management.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResponseDTO<T> {
    private String message;
    private int statusCode;
    private T data;
}
