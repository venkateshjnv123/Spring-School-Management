package com.seroter.school_management.controllers;

import com.seroter.school_management.dto.AuthDTO;
import com.seroter.school_management.models.Student;
import com.seroter.school_management.models.User;
import com.seroter.school_management.respository.StudentRepository;
import com.seroter.school_management.respository.SubjectsRepository;
import com.seroter.school_management.respository.UserRepository;
import com.seroter.school_management.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class LoginController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/register")
    public ResponseEntity<AuthDTO> register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
            if (studentRepository.findByUserName(user.getUserName()) == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username not exists in the student database");
            }
        String token = jwtTokenProvider.getJwtToken(user.getUserName());
        userRepository.save(user);
        return new ResponseEntity<>(
                AuthDTO.builder()
                        .token(token)
                        .role(user.getRole())
                        .student(studentRepository.findByUserName(user.getUserName()))
                        .userName(user.getUserName()).build(),
                HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDTO> authenticateUser(@RequestBody User user){
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    user.getUserName(), user.getPassword()));

            String role = userRepository.findByUserName(user.getUserName()).getRole();
        String token = jwtTokenProvider.getJwtToken(user.getUserName());

            if(role.equals("principal")){
                return new ResponseEntity<>(AuthDTO.builder()
                        .userName(user.getUserName())
                        .token(token)
                        .role(role).build() ,HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<>(AuthDTO.builder()
                    .userName(user.getUserName())
                    .role(role)
                    .token(token)
                    .student(studentRepository.findByUserName(user.getUserName()))
                    .build() ,HttpStatus.ACCEPTED);
    }

    @GetMapping("/profile")
    public String getProfile() {
        // Get authenticated user's details
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return "Hello, " + username;
    }
}
