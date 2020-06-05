import { TODO_ACTIONS } from '../references/references';
import { TodoInterface, TodoActionInterface } from '../interfaces/interfaces';

import { axios_config, axios_uriTemplateInterceptor } from '../services/axios-config';

const root = '/api';

export const todos_read_thunk = () =>
	(dispatch: any, getState: any, axios: any) => {// thunk, also receives `axios` dep.
		let config = axios_config();
		let path = '/api/todos';
		path = axios_uriTemplateInterceptor(path);
		axios.get(path, config)
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
export const todos_read = (todos:  TodoInterface[]): TodoActionInterface => ({
	type: TODO_ACTIONS.READ,
	id: 'ignore',
	priority: 'ignore',
	text: 'ignore',
	todos: todos
})

