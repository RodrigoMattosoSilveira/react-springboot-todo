import {CONSOLE_LOG_MESSAGE_TYPE, TODO_ACTIONS} from '../references/references';
import { TodoActionInterface } from '../references/interfaces';
import { TodoRestInterface } from '../references/interfaces';

const seedTodoList:TodoRestInterface[] = [];

export const todo_reducer = (state: TodoRestInterface[] = seedTodoList, action: TodoActionInterface): TodoRestInterface[] => {
	const showInfoMessages = false
    switch (action.type) {
		case TODO_ACTIONS.READ:
			console.log('todo_reducer/todos: ' + JSON.stringify(action.todos))
			return action.todos;
        default:
            return state;
    }
}
