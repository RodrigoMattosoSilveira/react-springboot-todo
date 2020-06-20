// External dependencies
import * as React from 'react'
import {connect, ConnectedProps} from 'react-redux';
// import { makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";

// Internal dependencies
import {RootState} from "../reducers/rootReducer";
import {TodoRestInterface} from "../interfaces/interfaces";
import { todo_delete_thunk } from "../actions/todos-actions";

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
	todo_delete_thunk: (todo: TodoRestInterface) => todo_delete_thunk(todo)
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
 * Styles configuration
 * *****************************************************************************
 */
// const useStyles = makeStyles((theme: Theme) => ({}));

const TodoText = (props: Props) => {
	// const classes = useStyles();
	
	const notAnOwner = () => {
		// https://stackoverflow.com/questions/29103096/dynamic-attribute-in-reactjs
		return props.todo.data.owner.name !== props.userName
			? {disabled: 'disabled'}
			: {};
	}
	
	return (
		<Tooltip title="delete">
			<IconButton
				aria-label="delete"
				onClick={() => props.todo_delete_thunk(props.todo)}
				disabled={props.todo.data.owner.name !== props.userName}
			>
				<DeleteIcon fontSize="small" />
			</IconButton>
		</Tooltip>
	)
}
export default connector(TodoText)
