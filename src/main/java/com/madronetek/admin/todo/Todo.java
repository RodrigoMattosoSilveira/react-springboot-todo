package com.madronetek.admin.todo;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import java.util.Objects;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity // @Entity is a JPA annotation that denotes the whole class for storage in a relational table.
public class Todo {

    // 	@Id and @GeneratedValue are JPA annotations to note the primary key and that is generated automatically when
    // 	needed.
    private @Id @GeneratedValue Long id;
    private String text;
    private Priorities priority;
    private boolean isCompleted;
    private @Version @JsonIgnore Long version;

    public Todo() {}

    public Todo(String text, Priorities priority) {
        this.text = text;
        this.priority = priority;
        this.isCompleted = false;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Todo todo = (Todo) o;
        return Objects.equals(id, todo.id) &&
                Objects.equals(text, todo.text) &&
                Objects.equals(priority, todo.priority) &&
                Objects.equals(isCompleted, todo.isCompleted) &&
                Objects.equals(version, todo.version);
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

    public void setText(Priorities priority) {

        this.priority = priority;
    }

    public boolean getIsCompleted() {

        return isCompleted;
    }

    public void setIsCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    public Long getVersion() { return version; }

    public void setVersion(Long version) { this.version = version;  }

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", priority='" + priority + '\'' +
                ", isCompleted='" + isCompleted + '\'' +
                ", version=" + version +
                '}';
    }
}
