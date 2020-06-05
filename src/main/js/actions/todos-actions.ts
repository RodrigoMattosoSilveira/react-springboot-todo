import { TODO_ACTIONS } from '../references/references';
import { TodoInterface, TodoActionInterface } from '../interfaces/interfaces';

const root = '/api';

export const todos_read_thunk = () =>
	(dispatch: any, getState: any, axios: any) => // thunk, also receives `axios` dep.
		axios.get('/api/todos', {
				headers: { 'Accept': 'application/hal+json' }
			})
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

export const todos_read = (todos:  TodoInterface[]): TodoActionInterface => ({
	type: TODO_ACTIONS.READ,
	id: 'ignore',
	priority: 'ignore',
	text: 'ignore',
	todos: todos
})

