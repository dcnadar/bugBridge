package com.cdac.bugbridge.models;

import java.util.ArrayList;
import java.util.List;

import com.cdac.bugbridge.util.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name", nullable = false)
  @Pattern(regexp = "^[a-zA-Z ]{3,50}$", message = "Name must contain onlyletters and spaces, with 3-50 characters.")
  private String name;

  @Column(name = "email", unique = true, nullable = false)
  @Pattern(regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$", message = "Invalid email format.")
  private String email;

  @Column(name = "role", nullable = false)
  @Enumerated(EnumType.STRING)
  private UserRole role;

  @Column(name = "password", nullable = false, length = 60)
  private String password;

  @JsonIgnore
  @OneToMany(mappedBy = "assignedTo", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Bug> assignedBugs = new ArrayList<>();

  @JsonIgnore
  @OneToMany(mappedBy = "reportedBy", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Bug> reportedBugs = new ArrayList<>();

  @JsonIgnore
  @OneToMany(mappedBy = "tester", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<BugAssignment> assignedBugAssignments = new ArrayList<>();

  @JsonIgnore
  @OneToMany(mappedBy = "developer", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<BugAssignment> receivedBugAssignments = new ArrayList<>();

  public User() {
  }

  public User(String email, String password) {
    this.email = email;
    this.password = password;
  }

  public User(String name, String email, UserRole role, String password) {
    this.name = name;
    this.email = email;
    this.role = role;
    this.password = password;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public UserRole getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = UserRole.fromString(role.trim().toUpperCase());
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public List<Bug> getAssignedBugs() {
    return assignedBugs;
  }

  public void setAssignedBugs(List<Bug> assignedBugs) {
    this.assignedBugs = assignedBugs;
  }

  public List<Bug> getReportedBugs() {
    return reportedBugs;
  }

  public void setReportedBugs(List<Bug> reportedBugs) {
    this.reportedBugs = reportedBugs;
  }

  public List<BugAssignment> getAssignedBugAssignments() {
    return assignedBugAssignments;
  }

  public void setAssignedBugAssignments(List<BugAssignment> assignedBugAssignments) {
    this.assignedBugAssignments = assignedBugAssignments;
  }

  public List<BugAssignment> getReceivedBugAssignments() {
    return receivedBugAssignments;
  }

  public void setReceivedBugAssignments(List<BugAssignment> receivedBugAssignments) {
    this.receivedBugAssignments = receivedBugAssignments;
  }

  @Override
  public String toString() {
    return "User{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", email='" + email + '\'' +
        ", role=" + role +
        ", password='" + password + '\'' +
        '}';
  }
}
