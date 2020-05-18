package com.madronetek.admin.todo;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasRole('ROLE_OWNER')")
public interface TodoRepository extends PagingAndSortingRepository<Todo, Long> {
    @Override
    @PreAuthorize("#todo?.owner == null or #todo?.owner?.name == authentication?.name")
    Todo save(@Param("todo") Todo todo);

    @Override
    @PreAuthorize("@todoRepository.findById(#id)?.owner?.name == authentication?.name")
    void deleteById(@Param("id") Long id);

    @Override
    @PreAuthorize("#todo?.owner?.name == authentication?.name")
    void delete(@Param("todo") Todo todo);
}
