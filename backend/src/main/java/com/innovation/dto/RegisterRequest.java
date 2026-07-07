package com.innovation.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50)
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    private String department;
    private String phoneNumber;

    @NotBlank(message = "Role is required")
    private String role;

    // Student fields
    private String registerNumber;
    private String year;
    private String section;

    // Faculty fields
    private String employeeId;
    private String designation;

    public String getUsername()        { return username; }
    public void setUsername(String v)  { this.username = v; }
    public String getEmail()           { return email; }
    public void setEmail(String v)     { this.email = v; }
    public String getPassword()        { return password; }
    public void setPassword(String v)  { this.password = v; }
    public String getFirstName()       { return firstName; }
    public void setFirstName(String v) { this.firstName = v; }
    public String getLastName()        { return lastName; }
    public void setLastName(String v)  { this.lastName = v; }
    public String getDepartment()      { return department; }
    public void setDepartment(String v){ this.department = v; }
    public String getPhoneNumber()     { return phoneNumber; }
    public void setPhoneNumber(String v){ this.phoneNumber = v; }
    public String getRole()            { return role; }
    public void setRole(String v)      { this.role = v; }
    public String getRegisterNumber()  { return registerNumber; }
    public void setRegisterNumber(String v){ this.registerNumber = v; }
    public String getYear()            { return year; }
    public void setYear(String v)      { this.year = v; }
    public String getSection()         { return section; }
    public void setSection(String v)   { this.section = v; }
    public String getEmployeeId()      { return employeeId; }
    public void setEmployeeId(String v){ this.employeeId = v; }
    public String getDesignation()     { return designation; }
    public void setDesignation(String v){ this.designation = v; }
}
