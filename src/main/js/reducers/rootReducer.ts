import { combineReducers } from 'redux'
import { todo_reducer } from './todo-reducer'
import { visibility_filter_reducer } from './visibility-filter-reducer'

export const rootReducer = combineReducers({
	todo_reducer,
	visibility_filter_reducer
})

export type RootState = ReturnType<typeof rootReducer>
