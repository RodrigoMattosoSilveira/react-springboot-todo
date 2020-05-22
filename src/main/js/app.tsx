// External Dependencies
import * as React from "react";
import { render } from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";

// Internal Dependencies
import TodoApp from "./components/todo-app";
import {rootReducer} from "./reducers/rootReducer";

const store = createStore(rootReducer)

const Root = () => {
	console.log("App: Loading")
	return (
		<Provider store={store}>
			<TodoApp
				loggedInOwner={document.getElementById('ownername').innerHTML}
			/>
		</Provider>
	);
}


render(<Root />, document.getElementById("root"));
