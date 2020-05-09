package com.madronetek.admin.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

// This class is marked with Spring’s @Component annotation so that it is automatically picked up by
// @SpringBootApplication.
@Component
// It implements Spring Boot’s CommandLineRunner so that it gets run after all the beans are created and registered.
public class DatabaseLoader implements CommandLineRunner {

    private final TodoRepository repository;

    // It uses constructor injection and autowiring to get Spring Data’s automatically created TodoRepository.
    @Autowired
    public DatabaseLoader(TodoRepository repository) {
        this.repository = repository;
    }

    @Override
    // The run() method is invoked with command line arguments, loading up your data.
    public void run(String... strings) throws Exception {
        this.repository.save(new Todo("Learn Springboot", Priorities.LOW));
        this.repository.save(new Todo("Learn Akka", Priorities.HIGH));
        this.repository.save(new Todo("Swim 50 laps in 30 minutes", Priorities.LOW));
        this.repository.save(new Todo("Exercise on the TotalGym 3 times a week", Priorities.LOW));
        this.repository.save(new Todo("Pedal on the recumbent 3 times a week", Priorities.HIGH));
        this.repository.save(new Todo("Cook fish twice as week", Priorities.LOW));
        this.repository.save(new Todo("Measure blood pressure daily", Priorities.LOW));
        this.repository.save(new Todo("Measure peek flow daily", Priorities.LOW));
        this.repository.save(new Todo("Measure oxygen level daily", Priorities.LOW));
    }
}
