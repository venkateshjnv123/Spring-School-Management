package com.seroter.school_management.models;


import com.seroter.school_management.utils.House;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class User
{
    @Id
    private String id;
    @Indexed(unique = true)
    @NonNull
    private String userName;
    private String password;
    private String role;
}
