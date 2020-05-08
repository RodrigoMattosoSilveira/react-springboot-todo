package com.madronetek.reactspringboot;

import org.springframework.data.repository.CrudRepository;

// (1) The repository extends Spring Data Commons' CrudRepository and plugs in the type of the domain object and its primary key
public interface TodoRepository extends CrudRepository<Todo, Long> {
}
