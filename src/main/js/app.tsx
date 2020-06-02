// External Dependencies
import * as React from "react";
import { render } from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";

// Internal Dependencies
import TodoApp from "./components/todo-app";
import {rootReducer} from "./reducers/rootReducer";
import { set_user_name_action} from "./actions/authenticated_user_actions";

const store = createStore(rootReducer);

const Root = () => {
	let currentUser: string = document.getElementById('ownername').innerHTML;
	console.log("App: Loading as " + currentUser);
	store.dispatch(set_user_name_action(currentUser))
	return (
			<Provider store={store}>
					<TodoApp/>
			</Provider>
	);
}

render(<Root />, document.getElementById("root"));
