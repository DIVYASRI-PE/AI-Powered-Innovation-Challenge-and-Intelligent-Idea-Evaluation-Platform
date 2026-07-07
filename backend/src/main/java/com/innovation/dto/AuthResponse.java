package com.innovation.dto;

public class AuthResponse {

    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private String department;
    private String phoneNumber;
    private String registerNumber;
    private String year;
    private String section;
    private String employeeId;
    private String designation;

    public AuthResponse() {}

    public AuthResponse(String token, String type, Long id, String username,
                        String email, String firstName, String lastName, String role) {
        this.token = token; this.type = type; this.id = id;
        this.username = username; this.email = email;
        this.firstName = firstName; this.lastName = lastName; this.role = role;
    }

    public String getToken()              { return token; }
    public void setToken(String v)        { this.token = v; }
    public String getType()               { return type; }
    public void setType(String v)         { this.type = v; }
    public Long getId()                   { return id; }
    public void setId(Long v)             { this.id = v; }
    public String getUsername()           { return username; }
    public void setUsername(String v)     { this.username = v; }
    public String getEmail()              { return email; }
    public void setEmail(String v)        { this.email = v; }
    public String getFirstName()          { return firstName; }
    public void setFirstName(String v)    { this.firstName = v; }
    public String getLastName()           { return lastName; }
    public void setLastName(String v)     { this.lastName = v; }
    public String getRole()               { return role; }
    public void setRole(String v)         { this.role = v; }
    public String getDepartment()         { return department; }
    public void setDepartment(String v)   { this.department = v; }
    public String getPhoneNumber()        { return phoneNumber; }
    public void setPhoneNumber(String v)  { this.phoneNumber = v; }
    public String getRegisterNumber()     { return registerNumber; }
    public void setRegisterNumber(String v){ this.registerNumber = v; }
    public String getYear()               { return year; }
    public void setYear(String v)         { this.year = v; }
    public String getSection()            { return section; }
    public void setSection(String v)      { this.section = v; }
    public String getEmployeeId()         { return employeeId; }
    public void setEmployeeId(String v)   { this.employeeId = v; }
    public String getDesignation()        { return designation; }
    public void setDesignation(String v)  { this.designation = v; }
}
