// External dependencies
import * as React from 'react'
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from "../reducers/rootReducer";
import {TodoRestInterface} from "../interfaces/interfaces";
import {todo_edit_priority_thunk} from "../actions/todos-actions";
// import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
// const useStyles = makeStyles((theme: Theme) => ({
// 	root: {
// 		flexGrow: 1,
// 	},
// 	menuButton: {
// 		marginRight: theme.spacing(2),
// 	},
// 	title: {
// 		flexGrow: 1,
// 	},
// 	appbarHello: {
// 		backgroundColor: "#5566c3",
// 	},
// 	blockMouseEvents: {
// 		pointerEvents: 'none',
// 	}
// }));

const TodoText = (props: Props) => {
	// const classes = useStyles();
	
	const notAnOwner = () => {
		// https://stackoverflow.com/questions/29103096/dynamic-attribute-in-reactjs
		return props.todo.data.owner.name !== props.userName
			? {disabled: 'disabled'}
			: {};
	}
	
	return (
		<TextField
			id="standard-basic"
			value={props.todo.data.text}
			fullWidth
			{...notAnOwner() as string}
		/>
	)
}
export default connector(TodoText)
