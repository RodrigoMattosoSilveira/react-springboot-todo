import {IPrioritiesFilter, IPrioritiesFilterAction} from "../references/interfaces";
import {PRIORITIES_ACTIONS} from "../references/references";


const defaultPriorities: IPrioritiesFilter = {
	low: true,
	medium: true,
	high: true
};

export const RPriorityFilter = (state = defaultPriorities, action: IPrioritiesFilterAction): IPrioritiesFilter => {
	// console.log('todo_item_state_reducer')
	// console.log(action)
	switch (action.type) {
		case PRIORITIES_ACTIONS.SET_STATE:
			return {... state, ... action.filterType};
		default:
			return state;
	}
	
}
