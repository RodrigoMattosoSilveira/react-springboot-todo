// External Dependencies
import * as React from "react";
import { render } from "react-dom";
import {Provider} from "react-redux";

// Internal Dependencies
import TodoApp from "./components/todo-app";
import { store } from './services/store'
import { set_user_name_action } from "./actions/authenticated_user_actions";
import * as REST_PARAMS from "./actions/rest_actions";
import { todo_load_from_server } from './actions/todos-actions';
import { PAGE_SIZE_DEFAULT } from './references/references'

const Root = () => {
	let currentUser: string = document.getElementById('ownername').innerHTML;
	let pageSize = store.getState().rest_page_size_reducer ? PAGE_SIZE_DEFAULT : store.getState().rest_page_size_reducer;
	console.log("App: Loading as " + currentUser);
	React.useEffect(() => {
		store.dispatch(set_user_name_action(currentUser))
		store.dispatch(REST_PARAMS.set_rest_page_size_action(pageSize));
		store.dispatch(todo_load_from_server());
	});
	
	return (
			<Provider store={store}>
					<TodoApp/>
			</Provider>
	);
}

render(<Root />, document.getElementById("root"));
