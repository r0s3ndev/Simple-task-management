package com.tmspringreact.task_manager.controller;

import com.tmspringreact.task_manager.entity.Task;
import com.tmspringreact.task_manager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("http://localhost:3000/")
@RestController
public class MainController {
    private final TaskService taskService;

    @Autowired
    public MainController (TaskService taskService){
        this.taskService = taskService;
    }

    @GetMapping("/")
    public ResponseEntity<String> homepage(){
        return ResponseEntity.status(HttpStatusCode.valueOf(200)).body("Hello from Spring");
    }

    @GetMapping("/getAllTask")
    public ResponseEntity<List<Task>> getAllTask(){
        return ResponseEntity.ok().body(taskService.getAllTask());
    }

    @GetMapping("/getTask/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id){
        return ResponseEntity.ok().body(taskService.getTaskById(id));
    }

    @PostMapping("/addTask")
    public ResponseEntity<Task> addTask(@RequestBody Task task){
        return ResponseEntity.ok().body(taskService.createTask(task));
    }

    @PostMapping("/updateTask/{id}")
    public ResponseEntity<Task> updateTask (@PathVariable Long id, @RequestBody Task task){
        return ResponseEntity.ok().body(taskService.updateTask(id, task));
    }

    @DeleteMapping("/deleteTask/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id){
        taskService.deleteTask(id);
        return ResponseEntity.ok().body("task deleted successfully");
    }

}
