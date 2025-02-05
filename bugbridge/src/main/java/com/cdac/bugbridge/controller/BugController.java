package com.cdac.bugbridge.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.bugbridge.dto.BugDTO;
import com.cdac.bugbridge.response.BugApiResponse;
import com.cdac.bugbridge.service.BugService;

@RestController
@RequestMapping("/api/bugs")
public class BugController {

  private final BugService bugService;

  // @Autowired
  public BugController(BugService bugService) {
    this.bugService = bugService;
  }

  // cretae a new Bug -- // --DONE
  @PostMapping("/create")
  public ResponseEntity<BugApiResponse> createBug(@RequestBody BugDTO request) {
    System.out.println(request);
    BugApiResponse createdBugResponse = bugService.createBug(
        request.getReportedBy(),
        request.getAssignedTo(),
        request.getDescription(),
        request.getPriority());
    return ResponseEntity.ok(createdBugResponse);
  }

  // List a/all new Bug -- // --DONE
  @GetMapping("/allBugs")
  public ResponseEntity<BugApiResponse> getAllBugs(
      @RequestParam(name = "user_id", required = false) Long id) {
    if (id != null) {
      BugApiResponse response = bugService.findByAssignedToId(id);
      return ResponseEntity.ok(response);
    }
    BugApiResponse response = bugService.findAll();
    return ResponseEntity.ok(response);
  }

  // bug by bug_id
  @GetMapping(value = "/{id}")
  public ResponseEntity<BugApiResponse> getBugById(@PathVariable Long id) {
    if (id != null) {
      BugApiResponse response = bugService.findBugById(id);
      return ResponseEntity.ok(response);
    }
    return ResponseEntity.ok(new BugApiResponse(403, "Id Not provided", "/api/bugs"));
  }

}
