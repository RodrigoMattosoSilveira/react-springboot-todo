// External dependencies
import { TODO_ACTIONS } from '../references/references';
import { TodoInterface, TodoActionInterface } from '../interfaces/interfaces';

// Internal Dependencies
import { axios_config_setup } from '../services/axios-config';

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
export const todos_read = (todos:  TodoInterface[]): TodoActionInterface => ({
	type: TODO_ACTIONS.READ,
	id: 'ignore',
	priority: 'ignore',
	text: 'ignore',
	todos: todos
})

