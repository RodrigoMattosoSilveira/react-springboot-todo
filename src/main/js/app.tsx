// External Dependencies
import * as React from "react";
import { render } from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";

// Internal Dependencies
import TodoApp from "./components/todo-app";
import {rootReducer} from "./reducers/rootReducer";
import { AuthenticationContextProvider } from './context-providers/autentication-context-provider';

const store = createStore(rootReducer)

const Root = () => {
	let currentUser: string = document.getElementById('ownername').innerHTML
	console.log("App: Loading as " + currentUser);
	return (
			<Provider store={store}>
				<AuthenticationContextProvider value={currentUser }>
					<TodoApp/>
				</AuthenticationContextProvider>
			</Provider>
	);
}


render(<Root />, document.getElementById("root"));
