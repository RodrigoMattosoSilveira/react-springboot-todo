package com.madronetek.admin.todo;

import static com.madronetek.admin.todo.WebSocketConfiguration.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.server.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

// tag::code[]
@Component
@RepositoryEventHandler(Todo.class) // <1>
public class EventHandler {

    private final SimpMessagingTemplate websocket; // <2>

    private final EntityLinks entityLinks;

    @Autowired
    public EventHandler(SimpMessagingTemplate websocket, EntityLinks entityLinks) {
        this.websocket = websocket;
        this.entityLinks = entityLinks;
    }

    @HandleAfterCreate // <3>
    public void newTodo(Todo employee) {
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/newTodo", getPath(employee));
    }

    @HandleAfterDelete // <3>
    public void deleteTodo(Todo employee) {
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/deleteTodo", getPath(employee));
    }

    @HandleAfterSave // <3>
    public void updateTodo(Todo employee) {
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/updateTodo", getPath(employee));
    }

    /**
     * Take an {@link Todo} and get the URI using Spring Data REST's {@link EntityLinks}.
     *
     * @param todo
     */
    private String getPath(Todo todo) {
        return this.entityLinks.linkForItemResource(todo.getClass(),
                todo.getId()).toUri().getPath();
    }

}
// end::code[]
