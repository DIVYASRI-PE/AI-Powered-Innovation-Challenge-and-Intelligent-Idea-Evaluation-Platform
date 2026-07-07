package com.innovation.service;

import com.innovation.dto.AuthResponse;
import com.innovation.dto.LoginRequest;
import com.innovation.dto.RegisterRequest;
import com.innovation.entity.User;
import com.innovation.repository.UserRepository;
import com.innovation.security.JwtTokenProvider;
import com.innovation.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    public AuthResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return buildAuthResponse(jwt, user);
    }

    public AuthResponse register(RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email is already in use!");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setDepartment(registerRequest.getDepartment());
        user.setPhoneNumber(registerRequest.getPhoneNumber());
        user.setRole(registerRequest.getRole().toUpperCase());
        // Role-specific fields
        if (registerRequest.getRegisterNumber() != null) user.setRegisterNumber(registerRequest.getRegisterNumber());
        if (registerRequest.getYear() != null)           user.setYear(registerRequest.getYear());
        if (registerRequest.getSection() != null)        user.setSection(registerRequest.getSection());
        if (registerRequest.getEmployeeId() != null)     user.setEmployeeId(registerRequest.getEmployeeId());
        if (registerRequest.getDesignation() != null)    user.setDesignation(registerRequest.getDesignation());

        User savedUser = userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        registerRequest.getUsername(),
                        registerRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        return buildAuthResponse(jwt, savedUser);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserPrincipal) {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            return userRepository.findById(userPrincipal.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }
        throw new RuntimeException("User not authenticated");
    }

    private AuthResponse buildAuthResponse(String jwt, User user) {
        AuthResponse r = new AuthResponse(jwt, "Bearer", user.getId(), user.getUsername(),
                user.getEmail(), user.getFirstName(), user.getLastName(), user.getRole());
        r.setDepartment(user.getDepartment());
        r.setPhoneNumber(user.getPhoneNumber());
        r.setRegisterNumber(user.getRegisterNumber());
        r.setYear(user.getYear());
        r.setSection(user.getSection());
        r.setEmployeeId(user.getEmployeeId());
        r.setDesignation(user.getDesignation());
        return r;
    }
}
