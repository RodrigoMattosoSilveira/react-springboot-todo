// External dependencies
import * as React from 'react'
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from "../reducers/rootReducer";
import {TodoRestInterface} from "../references/interfaces";
import {todo_toggle_isCompleted_thunk} from "../actions/todos-actions";
// import { makeStyles, Theme } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

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
 * Styles configuration
 * *****************************************************************************
 */
// const useStyles = makeStyles((theme: Theme) => ({
// }));

const TodoState = (props: Props) => {
	// const classes = useStyles();
	const [checked, setChecked] = React.useState(props.todo.data.isCompleted);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
		props.todo_toggle_isCompleted_thunk(props.todo)
	};
	
	const notAnOwner = () => {
		// https://stackoverflow.com/questions/29103096/dynamic-attribute-in-reactjs
		return props.todo.data.owner.name !== props.userName
			? {disabled: 'disabled'}
			: {};
	}
	
	return (
		<Checkbox
			{...notAnOwner() as string}
			checked={checked}
			onChange={handleChange}
			inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
		/>
	)
}
export default connector(TodoState)
