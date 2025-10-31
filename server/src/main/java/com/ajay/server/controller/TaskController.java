package com.ajay.server.controller;

import com.ajay.server.model.Task;
import com.ajay.server.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService service;

    @GetMapping
    public ResponseEntity<List<Task>> getTasks(Authentication authentication) {
        if (authentication == null) return ResponseEntity.status(401).build();
        String userId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(service.getUserTasks(userId));
    }

    @PostMapping
    public ResponseEntity<Task> addTask(Authentication authentication, @RequestBody Task task) {
        if (authentication == null) return ResponseEntity.status(401).build();
        String userId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(service.addTask(userId, task));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            Authentication authentication,
            @PathVariable String id,
            @RequestBody Task task
    ) {
        if (authentication == null) return ResponseEntity.status(401).build();
        String userId = (String) authentication.getPrincipal();
        task.setId(id);
        return ResponseEntity.ok(service.updateTask(userId, task));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(Authentication authentication, @PathVariable String id) {
        if (authentication == null) return ResponseEntity.status(401).build();
        String userId = (String) authentication.getPrincipal();
        service.deleteTask(userId, id);
        return ResponseEntity.noContent().build();
    }
}
