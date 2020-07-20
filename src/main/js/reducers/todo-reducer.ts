import {CONSOLE_LOG_MESSAGE_TYPE, TODO_ACTIONS} from '../references/references';
import { TodoActionInterface } from '../references/interfaces';
import { TodoRestInterface } from '../references/interfaces';
import {consoleMessage} from "../services/console-log";

const seedTodoList:TodoRestInterface[] = [];

export const todo_reducer = (state: TodoRestInterface[] = seedTodoList, action: TodoActionInterface): TodoRestInterface[] => {
	const showInfoMessages = false
    switch (action.type) {
		case TODO_ACTIONS.READ:
			consoleMessage(
				'todo_reducer/todos',
				CONSOLE_LOG_MESSAGE_TYPE.INFO,
				showInfoMessages
			);
			consoleMessage(
				JSON.stringify(action.todos),
				CONSOLE_LOG_MESSAGE_TYPE.INFO,
				showInfoMessages
			);
			return action.todos;
        default:
            return state;
    }
}
