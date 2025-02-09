package com.cdac.bugbridge.response;

import java.util.List;
import java.util.stream.Collectors;

import com.cdac.bugbridge.dto.BugAssignmentDTO;
import com.cdac.bugbridge.models.BugAssignment;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "timestamp", "status", "message", "path", "bugAssignmentDTO", "bugAssignment" })
public class BugAssignmentApiResponse {

  private String timestamp;
  private int status;
  private String message;
  private String path;

  private BugAssignmentDTO bugAssignmentDTO;

  private List<BugAssignmentDTO> bugAssignmentDTOList;

  public BugAssignmentApiResponse(int status, String message, String path, BugAssignmentDTO bugAssignmentDTO) {
    this.timestamp = java.time.LocalDateTime.now().toString();
    this.status = status;
    this.message = message;
    this.path = path;
    this.bugAssignmentDTO = bugAssignmentDTO;
  }

  public BugAssignmentApiResponse(int status, String message, String path,
      List<BugAssignmentDTO> bugAssignmentDTOList) {
    this.timestamp = java.time.LocalDateTime.now().toString();
    this.status = status;
    this.message = message;
    this.path = path;
    this.bugAssignmentDTOList = bugAssignmentDTOList;
  }

  public BugAssignmentApiResponse(List<BugAssignment> bugAssignments) {
    this.timestamp = java.time.LocalDateTime.now().toString();
    this.status = 200;
    this.message = "Bug assignments fetched successfully";
    this.path = "/api/bugs/test/{id}";
    this.bugAssignmentDTOList = bugAssignments.stream()
        .map(this::mapToDTO)
        .collect(Collectors.toList());
  }

  private BugAssignmentDTO mapToDTO(BugAssignment bugAssignment) {
    return new BugAssignmentDTO(
        bugAssignment.getId(),
        bugAssignment.getTester() != null ? bugAssignment.getTester().getName() : null,
        bugAssignment.getDeveloper() != null ? bugAssignment.getDeveloper().getName() : null,
        bugAssignment.getBug() != null ? bugAssignment.getBug().getId() : null,
        bugAssignment.getAssignedAt());
  }

  public String getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(String timestamp) {
    this.timestamp = timestamp;
  }

  public int getStatus() {
    return status;
  }

  public void setStatus(int status) {
    this.status = status;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getPath() {
    return path;
  }

  public void setPath(String path) {
    this.path = path;
  }

  public BugAssignmentDTO getBugAssignmentDTO() {
    return bugAssignmentDTO;
  }

  public void setBugAssignmentDTO(BugAssignmentDTO bugAssignmentDTO) {
    this.bugAssignmentDTO = bugAssignmentDTO;
  }

  public List<BugAssignmentDTO> getBugAssignmentDTOList() {
    return bugAssignmentDTOList;
  }

  public void setBugAssignmentDTOList(List<BugAssignmentDTO> bugAssignmentDTOList) {
    this.bugAssignmentDTOList = bugAssignmentDTOList;
  }

}
