// External dependencies
import * as React from 'react'
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from "../reducers/rootReducer";
import {TodoRestInterface} from "../references/interfaces";
import {todo_edit_text_thunk} from "../actions/todos-actions";
// import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import KeyboardEventHandler from 'react-keyboard-event-handler';
import KeyboardEventHandler from 'react-keyboard-event-handler';

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
	todo_edit_text_thunk: (todo: TodoRestInterface, newText: string) => todo_edit_text_thunk(todo, newText)
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
	
	const [trackingMouse, setTrackingMouse] = React.useState(false);
	const [textFieldValid, setTextFieldValid] = React.useState(true);
	const [textFieldValue, setTextFieldValue] = React.useState(props.todo.data.text);
	const [pristine, setPristine] = React.useState(true);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let valid = true;
		setPristine(false);
		setTextFieldValue(event.target.value);
		
		// If its length is zero
		if (event.target.value === "") {
			// its state is not valid
			valid = !valid;
		} else {
			// when the field has been touched and it has one or more characters
			// At leat one of these characters must be non blank
			valid = /.*\S.*/.test(event.target.value);
		}
		// console.log("value: " + event.target.value);
		// console.log("value length: " + event.target.value.length);
		// console.log("valid: " + valid);
		setTextFieldValid(valid);
	}
	
	const notAnOwner = () => {
		// https://stackoverflow.com/questions/29103096/dynamic-attribute-in-reactjs
		return props.todo.data.owner.name !== props.userName
			? {disabled: 'disabled'}
			: {};
	}
	
	const handleOnMouseEnter = (): any => {
		// console.log('TodoText/handleOnMouseEnter')
		// console.log('textFieldValid = ' + textFieldValid + ', textFieldValue = ' + textFieldValue + ', pristine: ' + pristine + ', trackingMouse: ' + trackingMouse)
	}
	
	const handleOnMouseOut = (): any => {
		console.log('TodoText/handleMouseOut')
		console.log('textFieldValid = ' + textFieldValid + ', textFieldValue = ' + textFieldValue + ', pristine: ' + pristine + ', trackingMouse: ' + trackingMouse)
		if (trackingMouse && textFieldValid && !pristine) {
			console.log('TodoText/handleMouseOut ... thunking')
			props.todo_edit_text_thunk(props.todo, textFieldValue);
		} else {
			setTextFieldValue(props.todo.data.text)
		}
		setTrackingMouse(false);
	}
	
	const helperTextToShow = (): string => {
		let textToShow = '';
		if (!textFieldValid) {
			textToShow = 'Must have at least one non-blank character'
		}
		else {
			if (!pristine) {
				textToShow = 'Type enter to update'
			}
		}
		return textToShow;
	}
	const handleOnKeyEvent = (key: string): any => {
		setPristine(true);
		setTextFieldValid(true);
		if (key === 'Enter') {
			props.todo_edit_text_thunk(props.todo, textFieldValue);
		}
		if (key === 'Esc') {
			setTextFieldValue(props.todo.data.text)
		}
	}
	
	return (
		<KeyboardEventHandler
			handleKeys={['Esc', 'Enter']}
			onKeyEvent={(key: string, e: any) => handleOnKeyEvent(key)} >
			<TextField
				id="standard-basic"
				value={textFieldValue}
				onChange={handleChange}
				error={!textFieldValid}
				helperText={helperTextToShow()}
				fullWidth
				{...notAnOwner() as string}
			/>
		</KeyboardEventHandler>
	)
}
export default connector(TodoText)
