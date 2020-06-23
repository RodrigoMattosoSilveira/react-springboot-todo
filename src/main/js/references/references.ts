export const PAGE_SIZE_DEFAULT = 3;

export const TODO_ACTIONS = {
    READ: 'READ',
	CREATE: 'CREATE',
	TOGGLE: 'TOGGLE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE'
}

export const TODOS_ACTIONS = {
	READ: 'READ'
}

export const TODO_COMPLETED = {
	FALSE: "false",
	TRUE: "true"
}

export const VISIBILITY_FILTER_TYPES = {
    ALL: 'all',
    OPEN: 'open',
    DONE: 'done'
}

export const VISIBILITY_FILTER_ACTIONS = {
    SET: 'SET'
}

export const AUTHENTICATED_USER_ACTIONS = {
	SET_USER_NAME: 'SET_USER_NAME'
}

export const REST_ACTIONS = {
	SET_REST_ATTRIBUTES: 'SET_REST_PARAMETER_ATTRIBUTES',
	SET_REST_PAGE_SIZE: 'SET_REST_PARAMETER_PAGE_SIZE',
	SET_REST_LINKS: 'SET_REST_PARAMETER_LINKS',
	SET_REST_SCHEMA: 'SET_REST_PARAMETER_SCHEMA',
	SET_REST_ROOT: 'SET_REST_ROOT'
}

export const HAL_ACTIONS = {
	SET_HAL_PAGE: 'SET_HAL_PAGE'
}

export const PAGINATION_TYPE = {
	FIRST: 'first',
	PREVIOUS: 'prev',
	NEXT: 'next',
	LAST: 'last'
}
