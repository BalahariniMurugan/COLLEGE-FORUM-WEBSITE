package com.example.demo.service;

import com.example.demo.model.Thread;
import com.example.demo.repository.ThreadRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

@Service
public class ThreadService {

    @Autowired
    private ThreadRepository threadRepository;

    public List<Thread> getAllThreads() {
        return threadRepository.findAllByOrderByCreatedAtDesc();
    }

    public Thread saveThread(Thread thread) {
        return threadRepository.save(thread);
    }

    public void deleteThread(Long threadId) {
        threadRepository.deleteById(threadId);
    }
    public Thread getThreadById(Long threadId) {
           Optional<Thread> thread = threadRepository.findById(threadId);
        return thread.orElse(null); // Return the thread if found, or null if not
    }
}
