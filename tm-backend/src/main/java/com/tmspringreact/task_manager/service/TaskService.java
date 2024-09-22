package com.tmspringreact.task_manager.service;

import com.tmspringreact.task_manager.entity.Task;
import com.tmspringreact.task_manager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService (TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTask (){
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id){
        return taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task createTask(Task task){
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task updateTask){
        Task task = getTaskById(id);
        task.setTitle(updateTask.getTitle());
        task.setDescription(updateTask.getDescription());
        task.getDate(updateTask.getDate());
        task.setStatus(updateTask.getStatus());
        return taskRepository.save(task);
    }

    public void deleteTask(Long id){
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found!"));
        taskRepository.deleteById(id);
    }
}
