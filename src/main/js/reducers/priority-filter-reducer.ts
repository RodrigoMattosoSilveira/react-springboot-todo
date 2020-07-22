import {IPrioritiesFilter, IPrioritiesFilterAction} from "../references/interfaces";
import {CONSOLE_LOG_MESSAGE_TYPE, PRIORITIES_ACTIONS} from "../references/references";
const defaultPriorities: IPrioritiesFilter = {
	low: true,
	medium: true,
	high: true
};

export const RPriorityFilter = (state = defaultPriorities, action: IPrioritiesFilterAction): IPrioritiesFilter => {
	// console.log('todo_item_state_reducer: ' + JSON.stringify(action));
	switch (action.type) {
		case PRIORITIES_ACTIONS.SET_STATE:
			return {... state, ... action.filterType};
		default:
			return state;
	}
	
}
