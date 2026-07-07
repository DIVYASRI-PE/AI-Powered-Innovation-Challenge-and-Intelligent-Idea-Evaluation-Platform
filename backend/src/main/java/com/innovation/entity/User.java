package com.innovation.entity;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private String department;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(nullable = false)
    private String role;

    // Student-specific fields
    @Column(name = "register_number", unique = true)
    private String registerNumber;

    private String year;
    private String section;

    // Faculty-specific fields
    @Column(name = "employee_id", unique = true)
    private String employeeId;

    private String designation;

    // Account status
    private boolean enabled = true;
    private boolean accountNonExpired = true;
    private boolean accountNonLocked = true;
    private boolean credentialsNonExpired = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public User() {}

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
        return authorities;
    }

    @Override public boolean isAccountNonExpired()     { return accountNonExpired; }
    @Override public boolean isAccountNonLocked()      { return accountNonLocked; }
    @Override public boolean isCredentialsNonExpired() { return credentialsNonExpired; }
    @Override public boolean isEnabled()               { return enabled; }

    public Long getId()              { return id; }
    public void setId(Long id)       { this.id = id; }

    @Override public String getUsername()              { return username; }
    public void setUsername(String u)                  { this.username = u; }

    public String getEmail()         { return email; }
    public void setEmail(String e)   { this.email = e; }

    @Override public String getPassword()              { return password; }
    public void setPassword(String p)                  { this.password = p; }

    public String getFirstName()     { return firstName; }
    public void setFirstName(String v){ this.firstName = v; }

    public String getLastName()      { return lastName; }
    public void setLastName(String v){ this.lastName = v; }

    public String getDepartment()    { return department; }
    public void setDepartment(String v){ this.department = v; }

    public String getPhoneNumber()   { return phoneNumber; }
    public void setPhoneNumber(String v){ this.phoneNumber = v; }

    public String getRole()          { return role; }
    public void setRole(String v)    { this.role = v; }

    public String getRegisterNumber()        { return registerNumber; }
    public void setRegisterNumber(String v)  { this.registerNumber = v; }

    public String getYear()          { return year; }
    public void setYear(String v)    { this.year = v; }

    public String getSection()       { return section; }
    public void setSection(String v) { this.section = v; }

    public String getEmployeeId()    { return employeeId; }
    public void setEmployeeId(String v){ this.employeeId = v; }

    public String getDesignation()   { return designation; }
    public void setDesignation(String v){ this.designation = v; }

    public void setEnabled(boolean v)              { this.enabled = v; }
    public void setAccountNonExpired(boolean v)    { this.accountNonExpired = v; }
    public void setAccountNonLocked(boolean v)     { this.accountNonLocked = v; }
    public void setCredentialsNonExpired(boolean v){ this.credentialsNonExpired = v; }

    public LocalDateTime getCreatedAt()      { return createdAt; }
    public void setCreatedAt(LocalDateTime v){ this.createdAt = v; }

    public LocalDateTime getUpdatedAt()      { return updatedAt; }
    public void setUpdatedAt(LocalDateTime v){ this.updatedAt = v; }
}
