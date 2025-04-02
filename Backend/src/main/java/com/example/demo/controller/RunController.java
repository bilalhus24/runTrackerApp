package com.example.demo.controller;

import com.example.demo.mapper.RunDto;
import com.example.demo.mapper.UserDto;
import com.example.demo.service.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/runs")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "${frontend.url}")
public class RunController {

    private final Service service;

    public RunController(Service service) {
        this.service = service;
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/user/{id}")
    public ResponseEntity<List<RunDto>> getRunsForAnyUser(@PathVariable Long id) {
        UserDto userDto = service.getUserById(id);
        List<RunDto> runs = service.getRunsByUserEmail(userDto.getEmail());
        return ResponseEntity.ok(runs);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<RunDto> getRunById(@PathVariable Long id) {
        RunDto runDto = service.getRunById(id);
        return ResponseEntity.ok(runDto);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping()
    public ResponseEntity<List<RunDto>> getAllRuns() {
        List<RunDto> runs = service.getAllRuns();
        return ResponseEntity.ok(runs);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<RunDto> addRun(@RequestBody RunDto runDto) {
        return new ResponseEntity<>(service.createRun(runDto), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/update")
    public ResponseEntity<RunDto> updateRun(@PathVariable Long id, @RequestBody RunDto runDto) {
        runDto.setId(id);
        return new ResponseEntity<>(service.updateRun(runDto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteRun(@PathVariable Long id) {
        service.deleteRun(id);
        return ResponseEntity.ok("Run deleted");
    }
}
