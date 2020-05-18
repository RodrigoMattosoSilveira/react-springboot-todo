package com.madronetek.admin.todo;

import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface OwnerRepository extends Repository<Owner, Long> {
    Owner save(Owner owner);

    Owner findByName(String name);
}
