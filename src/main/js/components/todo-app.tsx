// External Dependencies
import * as React from "react";
import {useContext} from "react";
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withLifecycleActions } from 'react-redux-lifecycle';

// Internal Dependencies
import { AuthenticationContext } from '../context-providers/autentication-context-provider';
// import TodoForm from "./todo-form";
// import TodoList from "./todo-list";
// import VisibilityFilters from "./visibility-filters";
// import "../styles/styles.css";

// Internal dependencies
import { RootState } from '../reducers/rootReducer'
import {connect} from 'react-redux';
// import TodoItem from './todo-item'
// import { TodoInterface } from "../interfaces/interfaces";
// import {todo_delete, todo_toggle, todo_update} from "../actions/todo-actions";

// import classes from "*.module.scss";
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

const readTodos = () => {
	console.log('TodoApp/myActionCreator')
	return { type: 'MY_ACTION' }
}

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
		userName: state.authenticated_user_reducer
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
	const userName = useContext(AuthenticationContext)
	console.log("TodoApp: User name: " + userName);
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
						<Button color="inherit">Logout</Button>
					</Toolbar>
				</AppBar>
			</div>
			{/*< CreateTodoItemForm />*/}
			{/*< SelectPageSizeForm />*/}
			{/*< TodoForm />*/}
			{/*<TodoList*/}
			{/*	// todoList={todoList}*/}
			{/*	// visibilityFilter={visibilityFilter}*/}
			{/*/>*/}
			{/*<VisibilityFilters />*/}
		</div>
	)
}
// export default TodoApp
// export default withLifecycleActions({ componentDidMount: readTodos })(TodoApp)
export default connector(TodoApp)
