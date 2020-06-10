// External Dependencies
import * as React from "react";
import {useContext, useEffect} from "react";
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';

// Internal Dependencies
import { AuthenticationContext } from '../context-providers/autentication-context-provider';
// import TodoForm from "./todo-form";
import TodoList from "./todo-list";
// import VisibilityFilters from "./visibility-filters";
// import "../styles/styles.css";
import { RootState } from '../reducers/rootReducer'
import {connect} from 'react-redux';
// import TodoItem from './todo-item'
// import { TodoInterface } from "../interfaces/interfaces";
// import {todo_delete, todo_toggle, todo_update} from "../actions/todo-actions";
// import classes from "*.module.scss";
const loadFromServer = require("../services/load-from-server");
import { store } from '../services/store'
import { todos_read_thunk } from '../actions/todos-actions';
import PageSize from "./page-size";

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
 * This is the heart of the component
 * *****************************************************************************
 */

// Comment out if not used
// interface OwnProps {
// }

// Set to null if not used
function mapStateToProps (state: RootState) {
	return {
		userName: state.authenticated_user_reducer,
		pageSize: state.rest_page_size_reducer,
		todos: state.todo_reducer
	};
}

// Set to null if not used
const mapDispatchToProps: any = null;

// Hook them up; note that the static typing is constrained to what is in use
const connector = connect(
	mapStateToProps,
	mapDispatchToProps
)
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps
type Props = StateProps & DispatchProps
// type Props = StateProps & DispatchProps & OwnProps;

/*
 * *****************************************************************************
 * End of the heart of the component
 * *****************************************************************************
 */

const TodoApp = (props: Props) => {
	console.log('TodoApp: Loading the app')
	const classes = useStyles();
	console.log("TodoApp: User name: " + props.userName);
	
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
						<form action="/logout" method="post">
							<input type="submit" value="Log Out"/>
						</form>
					
					</Toolbar>
				</AppBar>
			</div>
			<PageSize/>
			{/*< CreateTodoItemForm />*/}
			{/*< SelectPageSizeForm />*/}
			{/*< TodoForm />*/}
			<TodoList/>
			{/*<VisibilityFilters />*/}
		</div>
	)
}
// export default TodoApp
// export default withLifecycleActions({ componentDidMount: readTodos })(TodoApp)
export default connector(TodoApp)
