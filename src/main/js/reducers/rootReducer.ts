import { combineReducers } from 'redux';
import { todo_reducer } from './todo-reducer';
import { authenticated_user_reducer} from "./authenticted_user-reducer";
import { visibility_filter_reducer } from './visibility-filter-reducer';
import { rest_attributes_reducer } from './rest-reducer';
import { rest_page_size_reducer } from './rest-reducer';
import { rest_links_reducer } from './rest-reducer';
import { rest_root_reducer } from './rest-reducer';
import { hal_page_reducer } from "./hal-reducer";
import { todo_item_state_reducer } from './todo-item-state-reducer'
import { todo_item_priority_reducer } from "./todo-item-priority-reducer";

export const rootReducer = combineReducers({
	todo_reducer,
	authenticated_user_reducer,
	visibility_filter_reducer,
	rest_attributes_reducer,
	rest_page_size_reducer,
	rest_links_reducer,
	rest_root_reducer,
	hal_page_reducer,
	todo_item_state_reducer,
	todo_item_priority_reducer
})

export type RootState = ReturnType<typeof rootReducer>
