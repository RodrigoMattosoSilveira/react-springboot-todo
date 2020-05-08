package com.madronetek.reactspringboot;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import java.util.Objects;

@Entity // (1) @Entity is a JPA annotation that denotes the whole class for storage in a relational table.
public class Todo {

    private @Id @GeneratedValue
    Long id; // (2) @Id and @GeneratedValue are JPA annotations to note the primary key and that is generated automatically when needed.
    private String text;
    private Priorities priority;
    private boolean isCompleted;

    public Todo() {}
//    private Todo() {}

    public Todo(String text, Priorities priority, boolean isCompleted) {
        this.text = text;
        this.priority = priority;
        this.isCompleted = isCompleted;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Todo employee = (Todo) o;
        return Objects.equals(id, employee.id) &&
                Objects.equals(text, employee.text) &&
                Objects.equals(priority, employee.priority) &&
                Objects.equals(isCompleted, employee.isCompleted);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, text, priority, isCompleted);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Priorities getPriority() {
        return priority;
    }

    public void setPriority(Priorities priority) {
        this.priority = priority;
    }

    public boolean getIsCompleted() {
        return isCompleted;
    }

    public void setIsCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", priority='" + priority + '\'' +
                ", isCompleted='" + isCompleted + '\'' +
                '}';
    }
}
