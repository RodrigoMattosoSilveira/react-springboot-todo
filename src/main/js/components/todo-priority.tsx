// External dependencies
import * as React from 'react'
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from "../reducers/rootReducer";
import {TodoRestInterface} from "../references/interfaces";
import {todo_edit_priority_thunk} from "../actions/todos-actions";
import { makeStyles, Theme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

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
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

const TodoPriority = (props: Props) => {
	const classes = useStyles();
	
	const setClasses = (owner: string, userName: string) => {
		let classNames = `classes.todoPriorityFont`;
		if (owner !== userName) { classNames += ` classes.blockMouseEvents`}
		return classNames;
	}
	
	const notAnOwner = () => {
		// https://stackoverflow.com/questions/29103096/dynamic-attribute-in-reactjs
		return props.todo.data.owner.name !== props.userName
			? {disabled: 'disabled'}
			: {};
	}
	
	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		props.todo_edit_priority_thunk(props.todo, event.target.value as string)
	};
	
	return (
		<FormControl className={classes.formControl} {...notAnOwner() as string}>
			<Select className={setClasses(props.todo.data.owner.name, props.userName)}
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={props.todo.data.priority}
					onChange={handleChange}
			>
				<MenuItem value={'LOW'}>LOW</MenuItem>
				<MenuItem value={'MEDIUM'}>MEDIUM</MenuItem>
				<MenuItem value={'HIGH'}>HIGH</MenuItem>
			</Select>
		</FormControl>
	)
}
export default connector(TodoPriority)
