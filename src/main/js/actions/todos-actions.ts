// External dependencies
const axios = require('axios').default;

// Internal Dependencies
import { TODO_ACTIONS } from '../references/references';
// import { TodoInterface, TodoActionInterface } from '../interfaces/interfaces';
import { TodoRestInterface, TodoActionInterface } from '../interfaces/interfaces';
import { axios_config_setup } from '../services/axios-config';
import { client_setup_get } from '../services/client';
import { client_put_config } from '../services/client';
import { loadFromServer }  from '../services/load-from-server';
import {set_rest_links_action} from "./rest_actions";
import { TODO_COMPLETED } from "../references/references";

export const todos_read_thunk = () =>
	(dispatch: any, getState: any, axios: any) => {// thunk, also receives `axios` dep.
		let url = 'todos';
		let method = 'get';
		let pageSize = getState().rest_parameter_page_size_reducer;
		let config = axios_config_setup(url, method, pageSize);
		axios(config)
			.then(function (response: any) {
				// handle success
				dispatch(todos_read(response.data._embedded.todos))
			})
			.catch(function (error: any) {
				// handle error
				console.log(error);
			})
			.then(function () {
				// always executed
			});
	}
	
export const todo_toggle_isCompleted_thunk = (todo: TodoRestInterface) =>
	(dispatch: any, getState: any, axios: any) => {
		let url = todo.data._links.self.href;
		let updatedTodo = {
			text: todo.data.text,
			priority: todo.data.priority,
			isCompleted: !todo.data.isCompleted,
			owner: todo.data.owner,
		}
		let etag = todo.headers['Etag'];
		let client = client_put_config(url, updatedTodo, etag);
		client.put(url)
			.then(function (response: any) {
				if (response.status.code === 403) {
					alert('ACCESS DENIED: You are not authorized to update ' +
						todo.data._links.self.href);
				} else {
					if (response.status.code === 412) {
						alert('DENIED: Unable to update ' + todo.data._links.self.href +
							'. Your copy is stale.');
					} else {
						dispatch(todos_read(response.data._embedded.todos))
					}
				}
			})
			.catch(function (error: any) {
				// handle error
				console.log('todo_toggle_isCompleted_thunk');
				console.log(error);
			})
			.then(function () {
				// always executed
			});
	}

export const todo_load_from_server = () =>
	(dispatch: any, getState: any) => {// thunk, also receives `axios` dep.
		let pageSize = getState().rest_page_size_reducer;
		loadFromServer(pageSize, dispatch);
	}
	
export const todo_navigate_to_page = (navUri: string) =>
	(dispatch: any, getState: any) => {
		const client = client_setup_get();
		client.get(navUri)
			.then(function (todoCollection: any) {
				// handle success
				console.log('todo_navigate_to_page');
				console.log(todoCollection);
				
				dispatch(set_rest_links_action(todoCollection.data._links));
				const todoPromises = todoCollection.data._embedded.todos.map ((todo: any) =>
					client({ method: 'GET', url: todo._links.self.href }))
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

