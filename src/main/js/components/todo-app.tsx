// External Dependencies
import * as React from "react";
import {connect, ConnectedProps} from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Internal Dependencies
import TodoList from "./todo-list";
import TodoFilters from "./todo-filters";
import { RootState } from '../reducers/rootReducer'
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
const mapDispatchToProps: any = null;


const connector = connect(mapStateToProps, mapDispatchToProps)

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>

// Add own properties
type Props = PropsFromRedux & {}
// type Props = PropsFromRedux & {
// someAttributeName: someAttributeNameValue
// }

const TodoApp = (props: Props) => {
	console.log('TodoApp: Loading the app')
	console.log("TodoApp: User name: " + props.userName);
	
	const classes = useStyles();
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
			<PageSize/>
			{/*< CreateTodoItemForm />*/}
			{/*< SelectPageSizeForm />*/}
			{/*< TodoForm />*/}
			<TodoList/>
			<TodoFilters/>
		</div>
	)
}
export default connector(TodoApp)
