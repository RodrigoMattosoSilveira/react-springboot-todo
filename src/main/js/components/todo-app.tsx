// External Dependencies
import * as React from "react";
import { connect, ConnectedProps } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { AuthenticationContext } from '../context-providers/autentication-context-provider';
import {useContext} from "react";

// Internal Dependencies
// import TodoForm from "./todo-form";
// import TodoList from "./todo-list";
// import VisibilityFilters from "./visibility-filters";
// import "../styles/styles.css";

// import classes from "*.module.scss";
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

/*
 * *****************************************************************************
 * Start of the heart of the component
 * *****************************************************************************
 */
// interface OwnProps {
// 	userName: string;
// }

function mapStateToProps () {
	return {
	};
}

const mapDispatchToProps = {
}

const connector = connect(
	mapStateToProps, // mapStateToProps
	mapDispatchToProps // mapDispatchToProps,
)

// type StateProps = ReturnType<typeof mapStateToProps>;
// type DispatchProps = typeof mapDispatchToProps;
// // type Props = StateProps & DispatchProps & OwnProps;
// type Props = StateProps & DispatchProps;
// type PropsFromRedux = ConnectedProps<typeof connector>
// interface Props extends PropsFromRedux {
// 	loggedInOwner: string
// }


/*
 * *****************************************************************************
 * End of heart of the component
 * *****************************************************************************
 */

const TodoApp = () => {
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
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
							Hello {userName}
						</Typography>
						<Button color="inherit">Logout</Button>
					</Toolbar>
				</AppBar>
			</div>
			{/*< TodoForm />*/}
			{/*<TodoList*/}
			{/*	// todoList={todoList}*/}
			{/*	// visibilityFilter={visibilityFilter}*/}
			{/*/>*/}
			{/*<VisibilityFilters />*/}
		</div>
	)
}
export default TodoApp
