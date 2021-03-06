import {ITodoItemStateFilter, ITodoItemStateFilterAction} from "../references/interfaces";
import {TODO_ITEM_STATE_FILTER_ACTIONS} from "../references/references";
import {CONSOLE_LOG_MESSAGE_TYPE} from "../references/references";

const defaultTodoItemState: ITodoItemStateFilter = {
	active: true,		// Render active todo items
	completed: true		// Render completed todo items
};

export const todo_item_state_reducer = (state = defaultTodoItemState, action: ITodoItemStateFilterAction): ITodoItemStateFilter => {
	// console.log('todo_item_state_reducer: ' + JSON.stringify(action))
	switch (action.type) {
		case TODO_ITEM_STATE_FILTER_ACTIONS.SET_STATE:
			return {... state, ... action.filterType};
		default:
			return state;
	}
	
}
