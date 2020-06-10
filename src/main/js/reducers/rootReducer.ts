import { combineReducers } from 'redux';
import { todo_reducer } from './todo-reducer';
import { authenticated_user_reducer} from "./authenticted_user-reducer";
import { visibility_filter_reducer } from './visibility-filter-reducer'
import { rest_attributes_reducer } from './rest-reducer'
import { rest_page_size_reducer } from './rest-reducer'
import { rest_links_reducer } from './rest-reducer'

export const rootReducer = combineReducers({
	todo_reducer,
	authenticated_user_reducer,
	visibility_filter_reducer,
	rest_attributes_reducer,
	rest_page_size_reducer,
	rest_links_reducer
})

export type RootState = ReturnType<typeof rootReducer>
