import {ITodoPrioritiesAction, ITodoItemPriorities} from "../interfaces/interfaces";
import {TODO_ITEM_PRIORITY_ACTIONS} from "../references/references";

const defaultTodoItemPriorities: ITodoItemPriorities = {
	low: true,		// Render low priority todo items
	medium: true,   // Render medium priority todo items
	high: true		// Render high priority todo items
};

export const todo_item_priority_reducer = (state = defaultTodoItemPriorities, action: ITodoPrioritiesAction): ITodoItemPriorities => {
	console.log('todo_item_priority_reducer');
	console.log(action);
	switch (action.type) {
		case TODO_ITEM_PRIORITY_ACTIONS.SET_STATE:
			return {... state, ... action.priorities};
		default:
			return state;
	}
}
