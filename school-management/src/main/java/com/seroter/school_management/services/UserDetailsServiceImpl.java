package com.seroter.school_management.services;

import com.seroter.school_management.models.Student;
import com.seroter.school_management.models.User;
import com.seroter.school_management.respository.StudentRepository;
import com.seroter.school_management.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User student = userRepository.findByUserName(username);
        if(student != null){
            return org.springframework.security.core.userdetails.User
                    .builder()
                    .username(student.getUserName())
                    .password(student.getPassword())
                    .roles(student.getRole())
                    .build();
        }
        throw new UsernameNotFoundException("User not found");
    }
}
