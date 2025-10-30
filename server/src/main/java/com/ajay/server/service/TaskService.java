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
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));

        // safer null check
        if (task.getUserId() == null || !task.getUserId().equals(userId)) {
            throw new SecurityException("Unauthorized to delete this task");
        }
        System.out.println("deleteTask called: userId=" + userId + " taskId=" + taskId);
        System.out.println("existing task userId=" + task.getUserId());

        repo.deleteById(taskId);
    }

    public Task updateTask(String userId, Task task) {
        Task existing = repo.findById(task.getId())
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + task.getId()));

        if (existing.getUserId() == null || !existing.getUserId().equals(userId)) {
            throw new SecurityException("Unauthorized to modify this task");
        }

        // copy only allowed fields (do NOT overwrite userId)
        if (task.getTitle() != null) existing.setTitle(task.getTitle());
        existing.setCompleted(task.isCompleted());
        if (task.getDescription() != null) existing.setDescription(task.getDescription());
        // preserve existing.createdAt, existing.userId etc.
        System.out.println("updateTask called: userId=" + userId + " task=" + task.getId());

        return repo.save(existing);
    }
}
