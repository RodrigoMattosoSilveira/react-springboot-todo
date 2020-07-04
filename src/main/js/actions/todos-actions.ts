// External dependencies
import get = Reflect.get;

const axios = require('axios').default;

// Internal Dependencies
import { TODO_ACTIONS } from '../references/references';
import { TODO_COMPLETED } from "../references/references";
import { TODO_ITEM_STATE_ACTIONS } from "../references/references";
import {
	ITodoItemAction,
	TodoRestInterface,
	ITodoItemStates, ITodoItemPriorities, ITodoPrioritiesAction
} from '../interfaces/interfaces';
import { TodoActionInterface } from '../interfaces/interfaces';
import { client_setup_get } from '../services/client';
import { client_update_config } from '../services/client';
import { loadFromServer }  from '../services/load-from-server';
import { set_rest_links_action } from "./rest_actions";


export const todo_toggle_isCompleted_thunk = (todo: TodoRestInterface) =>
	(dispatch: any, getState: any, axios: any) => {
		let updateTodo = {
			isCompleted: todo.data.isCompleted === false ? TODO_COMPLETED.TRUE : TODO_COMPLETED.FALSE
		}
		todo_update(dispatch, todo, updateTodo)
	}
	
export const todo_edit_priority_thunk = (todo: TodoRestInterface, priority: string) =>
	(dispatch: any, getState: any, axios: any) => {
		let updateTodo = { priority: priority}
		todo_update(dispatch, todo, updateTodo)
	}
	
const todo_update = (dispatch: any, todo: TodoRestInterface, updateTodo: {}) => {
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
			console.log('todo_update_thunk');
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
	
export const todo_navigate_to_page_thunk = (navUri: string) =>
	(dispatch: any, getState: any) => {
		const client = client_setup_get();
		client.get(navUri)
			.then(function (todoCollection: any) {
				// handle success
				console.log('todo_navigate_to_page_thunk');
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

export const todos_table_header_state_actions = ( newState:  ITodoItemStates): ITodoItemAction => ({
	type: TODO_ITEM_STATE_ACTIONS.SET_STATE,
	activeCompleted: newState
})

export const todos_table_header_priority_actions = ( newState:  ITodoItemPriorities): ITodoPrioritiesAction => ({
	type: TODO_ITEM_STATE_ACTIONS.SET_STATE,
	priorities: newState
})

const alertMsg = (url: string, summary: string, detail: string): string => {
	let alertMsg = url;
	alertMsg += '\n\n' + summary;
	alertMsg += '\n' + detail;
	return alertMsg;
}
