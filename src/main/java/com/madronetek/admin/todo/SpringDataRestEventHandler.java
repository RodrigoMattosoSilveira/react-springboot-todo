package com.madronetek.admin.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * @author Rodrigo Silveira
 */
// tag::code[]
@Component
@RepositoryEventHandler(Todo.class) // <1>
public class SpringDataRestEventHandler {

    private final OwnerRepository ownerRepository;

    @Autowired
    public SpringDataRestEventHandler(OwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    @HandleBeforeCreate
    @HandleBeforeSave
    public void applyUserInformationUsingSecurityContext(Todo todo) {

        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        Owner owner = this.ownerRepository.findByName(name);
        if (owner == null) {
            Owner newOwner = new Owner();
            newOwner.setName(name);
            newOwner.setRoles(new String[]{"ROLE_OWNER"});
            owner = this.ownerRepository.save(newOwner);
        }
        todo.setOwner(owner);
    }
}
// end::code[]
