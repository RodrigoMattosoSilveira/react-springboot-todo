// External dependencies
import * as React from 'react'
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from "../reducers/rootReducer";
import {TodoRestInterface} from "../references/interfaces";
import {todo_toggle_isCompleted_thunk} from "../actions/todos-actions";
import { makeStyles, Theme } from '@material-ui/core/styles';

// Internal dependencies

/*
 * *****************************************************************************
 * Prop configuration
 * *****************************************************************************
 */

// Set to null if not used
function mapStateToProps (state: RootState) {
	return {
		userName: state.authenticated_user_reducer,
	};
}

// Set to null if not used
const mapDispatchToProps = {
	todo_toggle_isCompleted_thunk: (todo: TodoRestInterface) => todo_toggle_isCompleted_thunk(todo)
}

const connector = connect(mapStateToProps, mapDispatchToProps)

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>

// Add own properties
// type Props = PropsFromRedux & {}
type Props = PropsFromRedux & {
	todo: TodoRestInterface
}

/*
 * *****************************************************************************
 * Styles configuration Start
 * *****************************************************************************
 */
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
	},
	blockMouseEvents: {
		pointerEvents: 'none',
	}
}));

const TodoState = (props: Props) => {
	const classes = useStyles();
	
	// @ts-ignore
	const computeState = (todo: TodoRestInterface, userName: string) => {
		let className = 'todo-item-state';
		className += todo.data.isCompleted ? ' todo-item-checked' : ' todo-item-unchecked ';
		className += todo.data.owner.name === userName ? '' : classes.blockMouseEvents;
		
		return (
			<span className={className}>{todo.data.isCompleted ? '✔' : ''}</span>
		)
	};
	
	return (
		<div
			className={"todo-is-completed"}
			onClick={() => props.todo_toggle_isCompleted_thunk(props.todo)}
		>
			{computeState(props.todo, props.userName)}
		</div>
	)
}
export default connector(TodoState)
