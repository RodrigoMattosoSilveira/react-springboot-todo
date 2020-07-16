// External dependencies
import get = Reflect.get;

const axios = require('axios').default;

// Internal Dependencies
import { TODO_ACTIONS } from '../references/references';
import { TODO_COMPLETED } from "../references/references";
import { TODO_ITEM_STATE_FILTER_ACTIONS } from "../references/references";
import { PRIORITIES_ACTIONS } from "../references/references";
import {
	ITodoItemStateFilterAction,
	TodoRestInterface,
	ITodoItemStateFilter, IPrioritiesFilter, IPrioritiesFilterAction, IHalPage
} from '../references/interfaces';
import { TodoActionInterface } from '../references/interfaces';
import { client_setup_get } from '../services/client';
import { client_add_config } from '../services/client';
import { client_update_config } from '../services/client';
import { loadFromServer }  from '../services/load-from-server';
import { set_rest_links_action } from "./rest_actions";
import { URL } from '../references/references'
import {set_hal_page} from "./hal-page-actions";
import {RootState} from "../reducers/rootReducer";


export const todo_toggle_isCompleted_thunk = (todo: TodoRestInterface) =>
	(dispatch: any, getState: any, axios: any) => {
		let updateTodo = {
			isCompleted: todo.data.isCompleted === false ? TODO_COMPLETED.TRUE : TODO_COMPLETED.FALSE
		}
		todo_update(dispatch, getState, todo, updateTodo)
	}
	
export const todo_edit_text_thunk = (todo: TodoRestInterface, text: string) =>
	(dispatch: any, getState: any, axios: any) => {
		let updateTodo = { text: text}
		todo_update(dispatch, getState, todo, updateTodo)
	}

export const todo_edit_priority_thunk = (todo: TodoRestInterface, priority: string) =>
	(dispatch: any, getState: any, axios: any) => {
		let updateTodo = { priority: priority}
		todo_update(dispatch, getState, todo, updateTodo)
	}

const todo_update = (dispatch: any, getState: any, todo: TodoRestInterface, updateTodo: {}) => {
	let url = todo.data._links.self.href;
	let etag = todo.headers['etag'];
	let client = client_update_config(etag);
	client.patch(url, updateTodo)
		.then(function (response: any) {
			switch (response.status) {
				case 400:
					alert(url + '\n\nBAD Request: like malformed request syntax, invalid request message parameters, or deceptive request routing etc.');
					break
				case 403:
					alert(url + '\n\nACCESS DENIED: You are not authorized to update this resource');
					break;
				case 412:
					alert(url + "\n\nDENIED: Your resource's copy is stale.");
					break;
				default:
					// dispatch(todo_load_from_server());
					const store: RootState = getState();
					const navUri = store.rest_links_reducer['self']['href'];
					const client = client_setup_get();
						client.get(navUri)
						.then(function (todoCollection: any) {
							// handle success
							console.log('todo_update_thunk');
							console.log(todoCollection);
							// Update the HAL _links
							const todoPromises = todoCollection.data._embedded.todos.map ((todo: any) =>
								client({ method: 'GET', url: todo._links.self.href })
							)
							Promise.all(todoPromises)
								.then(function (collection) {
									const todos = collection.map((todo: any) => todo)
									dispatch(todos_read(todos));
								})
								.catch(function (error: any) {
									// handle error
									console.log('todo_update_thunk');
									console.log(error);
								})
						})
						.catch(function (error: any) {
							// handle error
							console.log('todo_add_thunk');
							console.log(error);
						})
					// read the last page
					// 		"_links"."last"."href"
					break;
			}
		})
		.catch(function (error: any) {
			// handle error
			console.log('todo_update_thunk');
			console.log(error);
		})
}

export const todo_add_thunk = (newTodo: {}, pageSize: number) =>
	(dispatch: any, getState: any, axios: any) => {
		let client = client_add_config();
		const url = URL.TODO;
		client.post(url, newTodo)
			.then(function (response: any) {
				switch (response.status) {
					case 400:
						alert(url + '\n\nBAD Request: like malformed request syntax, invalid request message parameters, or deceptive request routing etc.');
						break
					case 403:
						alert(url + '\n\nACCESS DENIED: You are not authorized to add this resource');
						break;
					case 409:
						alert(url + '\n\nACCESS DENIED: Resource already exists');
						break;
					default:
						// dispatch(todo_load_from_server());
						const client = client_setup_get();
						const navUri = URL.TODO+'?size='+pageSize;
						client.get(navUri)
							.then(function (todoCollection: any) {
								// handle success
								console.log('todo_add_thunk');
								console.log(todoCollection);
								// Update the HAL _links
								dispatch(set_rest_links_action(todoCollection.data._links));
								// Update the HAL object
								dispatch(set_hal_page(todoCollection.data.page));
								// Use the HAL _links to retrieve the last page
								const navUri = todoCollection.data._links['last']['href'];
								client.get(navUri)
									.then(function (todoCollection: any) {
										// handle success
										console.log('todo_add_thunk/last page');
										console.log(todoCollection);
										// Read the last page's records
										const todoPromises = todoCollection.data._embedded.todos.map ((todo: any) =>
											client({ method: 'GET', url: todo._links.self.href })
										)
										Promise.all(todoPromises)
											.then(function (collection) {
												const todos = collection.map((todo: any) => todo)
												dispatch(todos_read(todos));
											});
									})
									.catch(function (error: any) {
										// handle error
										console.log('todo_add_thunk');
										console.log(error);
									})
							})
							.catch(function (error: any) {
								// handle error
								console.log('todo_add_thunk');
								console.log(error);
							})
						// read the last page
						// 		"_links"."last"."href"
						break
				}
			})
			.catch(function (error: any) {
				// handle error
				console.log('todo_add_thunk');
				console.log(error);
			})
	}


export const todo_delete_thunk = (todo: TodoRestInterface) =>
	(dispatch: any, getState: any, axios: any) => {
		let url = todo.data._links.self.href;
		let etag = todo.headers['etag'];
		let config = {
			validateStatus: false,
			headers: {
			'Content-Type': 'application/json',
				'If-Match': etag
			},
			timeout: 10000
		}
		axios.delete(url, config)
			.then(function (response: any) {
				switch (response.status) {
					case 400:
						alert(url + '\n\nBAD Request: like malformed request syntax, invalid request message parameters, or deceptive request routing etc.');
						break
					case 403:
						alert(url + '\n\nDelete DENIED: You are not authorized to delete this record');
						
						break;
					default:
						dispatch(todo_load_from_server());
						break
				}
			})
			.catch(function (error: any) {
				// handle error
				console.log('todo_delete_thunk');
				console.log(error);
			})
	}

export const todo_load_from_server = () =>
	(dispatch: any, getState: any) => {// thunk, also receives `axios` dep.
		let pageSize = getState().rest_page_size_reducer;
		let root = getState().rest_root_reducer;
		// @ts-ignore
		loadFromServer(pageSize, root, dispatch);
	}
	
export const todo_navigate_to_page_thunk = (navUri: string, pageNumber: number) =>
	(dispatch: any, getState: any) => {
		console.log('todo_list_actions/todo_navigate_to_page_thunk/navUri: ' + navUri);
		console.log('todo_list_actions/todo_navigate_to_page_thunk/pageNumber: ' + pageNumber);
		const client = client_setup_get();
		client.get(navUri)
			.then(function (todoCollection: any) {
				// handle success
				console.log('todo_navigate_to_page_thunk');
				console.log(todoCollection);
				
				dispatch(set_rest_links_action(todoCollection.data._links));
				dispatch(set_hal_page(todoCollection.data.page))
				const todoPromises = todoCollection.data._embedded.todos.map ((todo: any) =>
					client({ method: 'GET', url: todo._links.self.href })
				)
				Promise.all(todoPromises)
					.then(function (collection) {
						const todos = collection.map((todo: any) => todo)
						dispatch(todos_read(todos));
					});
			})
			.catch(function (error: any) {
				// handle error
				console.log(error);
			})
	}

export const todos_read = (todos:  TodoRestInterface[]): TodoActionInterface => ({
	type: TODO_ACTIONS.READ,
	todos: todos
})

export const todos_table_header_state_actions = ( newState:  ITodoItemStateFilter): ITodoItemStateFilterAction => ({
	type: TODO_ITEM_STATE_FILTER_ACTIONS.SET_STATE,
	filterType: newState
})

export const APriorityFilter = ( newState:  IPrioritiesFilter): IPrioritiesFilterAction => ({
	type: PRIORITIES_ACTIONS.SET_STATE,
	filterType: newState
})
