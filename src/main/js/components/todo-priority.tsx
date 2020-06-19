// External dependencies
import * as React from 'react'
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from "../reducers/rootReducer";
import {TodoRestInterface} from "../interfaces/interfaces";
import {todo_edit_priority_thunk} from "../actions/todos-actions";
import { makeStyles, Theme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
	todo_edit_priority_thunk: (todo: TodoRestInterface, newPriority: string) => todo_edit_priority_thunk(todo, newPriority)
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
	},
	todoTextFont: {
	fontSize: "1rem",
	},
	todoPriority: {
		width: "32px"
	},
	todoPriorityFont: {
		fontSize: "1rem"
	},
}));

const TodoPriority = (props: Props) => {
	const classes = useStyles();
	
	const handleClick = (event: React.MouseEventHandler<HTMLSelectElement>) => {
		props.todo_edit_priority_thunk(props.todo, event.target.value)
	}
	
	const setClasses = (owner: string, userName: string) => {
		let classNames = `classes.todoPriorityFont`;
		if (owner !== userName) { classNames += ` classes.blockMouseEvents`}
		return classNames;
	}
	
	const notAnOwner = (): boolean => {
		return props.todo.data.owner.name !== props.userName;
	}

	return (
		<Select className={setClasses(props.todo.data.owner.name, props.userName)}
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={props.todo.data.priority}
				// https://stackoverflow.com/questions/51977823/type-void-is-not-assignable-to-type-event-mouseeventhtmlinputelement
				onClick={(event: React.MouseEventHandler<HTMLSelectElement>) => handleClick(event)}
				disable={notAnOwner()}
		>
			<MenuItem value={'LOW'}>LOW</MenuItem>
			<MenuItem value={'MEDIUM'}>MEDIUM</MenuItem>
			<MenuItem value={'HIGH'}>HIGH</MenuItem>
		</Select>
	)
}
export default connector(TodoPriority)
