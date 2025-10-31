package com.ajay.server.service;

import com.ajay.server.model.Task;
import com.ajay.server.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repo;

    public List<Task> getUserTasks(String userId) {
        return repo.findByUserId(userId);
    }

    public Task addTask(String userId, Task task) {
        task.setUserId(userId);
        return repo.save(task);
    }

    public void deleteTask(String userId, String taskId) {
        Task task = repo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found: " + taskId));

        if (!userId.equals(task.getUserId())) {
            throw new SecurityException("Unauthorized deletion");
        }

        repo.deleteById(taskId);
    }

    public Task updateTask(String userId, Task task) {
        Task existing = repo.findById(task.getId())
                .orElseThrow(() -> new RuntimeException("Task not found: " + task.getId()));

        if (!userId.equals(existing.getUserId())) {
            throw new SecurityException("Unauthorized update");
        }

        if (task.getTitle() != null) existing.setTitle(task.getTitle());
        if (task.getDescription() != null) existing.setDescription(task.getDescription());
        if (task.getLabel() != null) existing.setLabel(task.getLabel());
        existing.setCompleted(task.isCompleted());

        return repo.save(existing);
    }
}
