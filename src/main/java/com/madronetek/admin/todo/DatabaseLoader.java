package com.madronetek.admin.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

// This class is marked with Spring’s @Component annotation so that it is automatically picked up by
// @SpringBootApplication.
@Component
// It implements Spring Boot’s CommandLineRunner so that it gets run after all the beans are created and registered.
public class DatabaseLoader implements CommandLineRunner {

    private final TodoRepository todos;
    private final OwnerRepository owners;

    // It uses constructor injection and autowiring to get Spring Data’s automatically created TodoRepository.
    @Autowired
    public DatabaseLoader(TodoRepository repository, OwnerRepository ownerRepository) {

        this.todos = repository;
        this.owners = ownerRepository;
    }

    @Override
    // The run() method is invoked with command line arguments, loading up your data.
    public void run(String... strings) {

        // Owners
        Owner donald = this.owners.save(new Owner("donald", "trump", "ROLE_OWNER"));
        Owner nancy = this.owners.save(new Owner("nancy", "pelosi", "ROLE_OWNER"));

        SecurityContextHolder.clearContext();

        //  Todos
        // this caused me a huge headache. I copied the logic, but innacurately!!!!
        // I spent days looking for my error
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("donald", "does not matter",
                        AuthorityUtils.createAuthorityList("ROLE_MANAGER")));
        this.todos.save(new Todo(false, "Learn Springboot", Priorities.LOW, donald));
        this.todos.save(new Todo(false, "Learn Akka", Priorities.HIGH, donald));
        this.todos.save(new Todo(false, "Swim 50 laps in 30 minutes", Priorities.LOW, donald));
        this.todos.save(new Todo(false, "Exercise on the TotalGym 3 times a week", Priorities.LOW, donald));
        this.todos.save(new Todo(false, "Pedal on the recumbent 3 times a week", Priorities.HIGH, donald));

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("nancy", "does not matter",
                        AuthorityUtils.createAuthorityList("ROLE_MANAGER")));
        this.todos.save(new Todo(false, "Cook fish twice as week", Priorities.LOW, nancy));
        this.todos.save(new Todo(false, "Measure blood pressure daily", Priorities.LOW, nancy));
        this.todos.save(new Todo(false, "Measure peek flow daily", Priorities.LOW, nancy));
        this.todos.save(new Todo(false, "Measure oxygen level daily", Priorities.LOW, nancy));

        SecurityContextHolder.clearContext();
    }
}
