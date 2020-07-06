import { TODO_ACTIONS } from '../references/references';
import { TodoActionInterface } from '../references/interfaces';
import { TodoRestInterface } from '../references/interfaces';

const seedTodoList:TodoRestInterface[] = [];

export const todo_reducer = (state: TodoRestInterface[] = seedTodoList, action: TodoActionInterface): TodoRestInterface[] => {
    switch (action.type) {
		case TODO_ACTIONS.READ:
			return action.todos;
        default:
            return state;
    }
}
