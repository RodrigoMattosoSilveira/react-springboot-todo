// External dependencies
const axios = require('axios').default;

// Internal Dependencies
import { TODO_ACTIONS } from '../references/references';
import { TodoRestInterface, TodoActionInterface } from '../interfaces/interfaces';
import { client_setup_get } from '../services/client';
import { client_update_config } from '../services/client';
import { loadFromServer }  from '../services/load-from-server';
import { set_rest_links_action } from "./rest_actions";
import { TODO_COMPLETED } from "../references/references";

export const todo_toggle_isCompleted_thunk = (todo: TodoRestInterface) =>
	(dispatch: any, getState: any, axios: any) => {
		let updateTodo = {
			isCompleted: todo.data.isCompleted === false ? TODO_COMPLETED.TRUE : TODO_COMPLETED.FALSE
		}
		todo_update_thunk(dispatch, todo, updateTodo)
	}
	
export const todo_priority_thunk = (todo: TodoRestInterface, priority: string) =>
	(dispatch: any, getState: any, axios: any) => {
		let updateTod0 = { priority: priority}
		todo_update_thunk(dispatch, todo, updateTod0)
	}
export const todo_update_thunk = (dispatch: any, todo: TodoRestInterface, updateTodo: {}) => {
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
					alert(url + '\n\nACCESS DENIED: You are not authorized to update this record');
					break;
				case 412:
					alert(url + '\n\nDENIED: Your copy is stale.');
					break;
				default:
					dispatch(todo_load_from_server());
					break
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

const alertMsg = (url: string, summary: string, detail: string): string => {
	let alertMsg = url;
	alertMsg += '\n\n' + summary;
	alertMsg += '\n' + detail;
	return alertMsg;
}

