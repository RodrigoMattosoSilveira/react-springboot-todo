package com.madronetek.reactspringboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * To work with this application, you need to pre-load it with some data, as follows
  */

// (1) This class is marked with Spring’s @Component annotation so that it is automatically picked up by @SpringBootApplication.
@Component
// (2) It implements Spring Boot’s CommandLineRunner so that it gets run after all the beans are created and registered.
public class DatabaseLoader implements CommandLineRunner {


    private final TodoRepository repository;

    // (3) It uses constructor injection and autowiring to get Spring Data’s automatically created EmployeeRepository.
    @Autowired
    public DatabaseLoader(TodoRepository repository) {
        this.repository = repository;
    }

    // (4) The run() method is invoked with command line arguments, loading up your data.
    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Todo("Finish React SpringBoot Integration", Priorities.LOW, false));
        this.repository.save(new Todo("Learn Akka", Priorities.HIGH, false));
        this.repository.save(new Todo("Keep weight below 185", Priorities.MEDIUM, false));
    }
}
