import {ITodoItemStates, ITodoItemAction} from "../interfaces/interfaces";
import {TODO_ITEM_STATE_ACTIONS} from "../references/references";


const defaultTodoItemState: ITodoItemStates = {
	active: true,		// Render active todo items
	completed: true		// Render completed todo items
};

export const todo_item_state_reducer = (state = defaultTodoItemState, action: ITodoItemAction): ITodoItemStates => {
	console.log('todo_item_state_reducer')
	console.log(action)
	switch (action.type) {
		case TODO_ITEM_STATE_ACTIONS.SET_STATE:
			return {... state, ... action.activeCompleted};
		default:
			return state;
	}
}
