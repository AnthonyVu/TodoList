package com.example.Auth0demo.service;

import com.example.Auth0demo.model.Todo;
import com.example.Auth0demo.repository.TodoListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TodoListService {

    @Autowired
    private TodoListRepo todoListRepo;

    public List<Todo> getAll(String email) {
        Optional<List<Todo>> todosByEmail = todoListRepo.findAllByEmail(email);
        return todosByEmail.orElse(Collections.emptyList());
    }

    public Todo getTodo(Long id) {
        Optional<Todo> todo = todoListRepo.findById(id);
        if(todo.isPresent()) {
            return todo.get();
        }
        return null;
    }

    public Todo addTodo(Todo todo) {
        todoListRepo.save(todo);
        return todo;
    }

    public boolean deleteTodo(Long id) {
        Optional<Todo> todoToDelete = todoListRepo.findById(id);
        if(todoToDelete.isPresent()) {
            todoListRepo.delete(todoToDelete.get());
            return true;
        }
        return false;
    }

    public Todo updateTodo(Long id, Todo newTodo) {
        Optional<Todo> todo = todoListRepo.findById(id);
        if(todo.isPresent()) {
            todo.get().setTitle(newTodo.getTitle());
            todo.get().setDescription(newTodo.getDescription());
            todo.get().setDueDate(newTodo.getDueDate());
            todo.get().setPriority(newTodo.getPriority());
        }
        return todo.get();
    }
}
