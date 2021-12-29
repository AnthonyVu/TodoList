package com.example.Auth0demo.controller;

import com.example.Auth0demo.model.Todo;
import com.example.Auth0demo.service.TodoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class TodoListController {

    @Autowired
    private TodoListService todoListService;

    @GetMapping
    public ResponseEntity<Void> testApi() {
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping(value="/todos/email/{email}")
    public ResponseEntity<List<Todo>> getAll(@PathVariable String email) {
        List<Todo> todos = todoListService.getAll(email);
        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

    @GetMapping(value = "/todos/id/{id}")
    public ResponseEntity<Todo> getTodo(@PathVariable Long id) {
        Todo todo = todoListService.getTodo(id);
        if(todo != null) {
            return new ResponseEntity<>(todo, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_GATEWAY);
    }

    @PostMapping(value = "/todos")
    public ResponseEntity<Todo> addTodo(@RequestBody @Valid Todo todo) {
        todoListService.addTodo(todo);
        return new ResponseEntity<>(todo, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/todos/id/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        if(todoListService.deleteTodo(id)) {
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
    }

    @PutMapping(value = "/todos/id/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        todoListService.updateTodo(id, todo);
        return new ResponseEntity<>(todo, HttpStatus.OK);
    }
}
