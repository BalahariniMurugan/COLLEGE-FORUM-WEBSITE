package com.example.demo.controller;

import com.example.demo.model.Thread;
import com.example.demo.service.ThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/threads")
public class ThreadController {

    @Autowired
    private ThreadService threadService;

    @Autowired
private UserRepository userRepository;


    @GetMapping
    public List<Thread> getAllThreads() {
        return threadService.getAllThreads();
    }

    // @PostMapping
    // public ResponseEntity<Thread> createThread(@RequestBody Thread thread) {
    //     thread.setCreatedAt(new Date()); // Set the creation date

    //     // Proceed without an author if not provided
    //     // You can log the case or handle it differently if needed
    //     if (thread.getAuthor() == null) {
    //         //System.out.println("Thread created without an author.");
    //         return ResponseEntity.badRequest().body(null);
    //     }

    //     Thread savedThread = threadService.saveThread(thread);
    //     return ResponseEntity.ok(savedThread);
    // }
    @PostMapping
    public ResponseEntity<Thread> createThread(@RequestBody Thread thread) {
        if (thread == null) {
            return ResponseEntity.badRequest().body(null); // Request body is null
        }
    
        User author = thread.getAuthor();
        if (author == null || author.getId() == null) {
            return ResponseEntity.badRequest().body(null); // Author is required
        }
        
        // Fetch the user from the database to ensure it exists
        User existingUser = userRepository.findById(author.getId()).orElse(null);
        if (existingUser == null) {
            return ResponseEntity.badRequest().body(null); // Invalid user
        }
    
        thread.setAuthor(existingUser); // Set the existing user
        thread.setCreatedAt(new Date());
        
        try {
            Thread savedThread = threadService.saveThread(thread);
            return ResponseEntity.ok(savedThread);
        } catch (Exception e) {
            e.printStackTrace(); // Print stack trace for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    


    @DeleteMapping("/{threadId}")
    public ResponseEntity<Void> deleteThread(@PathVariable Long threadId) {
        threadService.deleteThread(threadId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{threadId}")
public ResponseEntity<Thread> getThreadById(@PathVariable Long threadId) {
    Thread thread = threadService.getThreadById(threadId);
    if (thread != null) {
        return ResponseEntity.ok(thread);
    } else {
        return ResponseEntity.notFound().build();
    }
}

}
