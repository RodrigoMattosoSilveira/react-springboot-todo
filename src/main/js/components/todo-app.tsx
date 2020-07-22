// External Dependencies
import * as React from "react";
import {connect, ConnectedProps} from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Internal Dependencies
import TodoList from "./todo-list";
import { RootState } from '../reducers/rootReducer'
import stompClient from '../services/websocket-listener'
import {
	websocket_delete_todo_message_thunk,
	websocket_new_todo_message_thunk,
	websocket_update_todo_message_thunk
} from "../actions/websocket-actions";

import {store} from "../services/store";
import {set_user_name_action} from "../actions/authenticated_user_actions";
import * as REST_PARAMS from "../actions/rest_actions";
import {todo_load_from_server} from "../actions/todos-actions";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	appbarHello: {
		backgroundColor: "#5566c3",
	}
}));

/*
 * *****************************************************************************
 * Prop configuration
 * *****************************************************************************
 */

// Set to null if not used
// const mapStateToProps = null
const mapStateToProps = (state: RootState) => {
	return {
		userName: state.authenticated_user_reducer
	};
}

// Set to null if not used
// const mapDispatchToProps = null
const mapDispatchToProps = {
	websocket_new_todo_message_thunk: (message: any) => websocket_new_todo_message_thunk(message),
	websocket_update_todo_message_thunk: (message: any) => websocket_update_todo_message_thunk(message),
	websocket_delete_todo_message_thunk: (message: any) => websocket_delete_todo_message_thunk(message),
}


const connector = connect(mapStateToProps, mapDispatchToProps)

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>

// Add own properties
type Props = PropsFromRedux & {}
// type Props = PropsFromRedux & {
// someAttributeName: someAttributeNameValue
// }

const TodoApp = (props: Props) => {
	 // console.log('TodoApp: Loading the app')
	 // console.log("TodoApp: User name: " + props.userName);
	
	const classes = useStyles();
	const [registered, setRegistered] = React.useState(false);
	
	
	React.useEffect(() => {
		if (!registered) {
			setRegistered(true);
			stompClient.register([
				{route: '/topic/newTodo', callback: props.websocket_new_todo_message_thunk},
				{route: '/topic/updateTodo', callback: props.websocket_update_todo_message_thunk},
				{route: '/topic/deleteTodo', callback: props.websocket_delete_todo_message_thunk}
			]);
		}
	});
	
	return (
		<div className="todo-list-app">
			{/* <h1 className="todo-header">todo</h1>*/}
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h5" className={classes.title}>
							React Redux TS Material UI Todo List
						</Typography>
					</Toolbar>
				</AppBar>
				<AppBar position="static" className={classes.appbarHello}>
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
							Hello {props.userName}
						</Typography>
						<form action='/logout' method="post">
							<input type="submit" value="Log Out"/>
						</form>
					
					</Toolbar>
				</AppBar>
			</div>
			{/*< CreateTodoItemForm />*/}
			{/*< SelectPageSizeForm />*/}
			{/*< TodoForm />*/}
			<TodoList/>
		</div>
	)
}
export default connector(TodoApp)
