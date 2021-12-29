package com.example.Auth0demo.repository;

import com.example.Auth0demo.model.Todo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TodoListRepo extends CrudRepository<Todo, Long> {
    Optional<Todo> findById(Long id);
    Optional<List<Todo>> findAllByEmail(String email);
}
