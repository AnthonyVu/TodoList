package com.example.todolist.Models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "todos")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter
    private long id;

    @Getter
    @Setter
    private String title;

    @Getter
    @Setter
    private String priority;

    @Getter
    @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate date;
    public Todo() {}

    public Todo(String title, LocalDate date, String priority) {
        this.title = title;
        this.date = date;
        this.priority = priority;
    }

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", priority='" + priority + '\'' +
                ", date=" + date +
                '}';
    }
}
