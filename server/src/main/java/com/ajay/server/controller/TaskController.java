package com.ajay.server.controller;

import com.ajay.server.model.Task;
import com.ajay.server.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskService service;

    @GetMapping
    public List<Task> getTasks(Authentication authentication) {
        if (authentication == null) throw new RuntimeException("Unauthenticated user");
        String userId = (String) authentication.getPrincipal();
        return service.getUserTasks(userId);
    }

    @PostMapping
    public Task addTask(Authentication authentication, @RequestBody Task task) {
        if (authentication == null) throw new RuntimeException("Unauthenticated user");
        String userId = (String) authentication.getPrincipal();
        return service.addTask(userId, task);
    }


    @PutMapping("/{id}")
    public Task updateTask(Authentication authentication, @PathVariable String id, @RequestBody Task task) {
        String userId = (String) authentication.getPrincipal();
        task.setId(id);
        return service.updateTask(userId, task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(Authentication authentication, @PathVariable String id) {
        String userId = (String) authentication.getPrincipal();
        service.deleteTask(userId, id);
    }
}
