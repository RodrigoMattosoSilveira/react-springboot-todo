// External dependencies
import * as React from 'react'
import {connect, ConnectedProps} from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableHead from '@material-ui/core/TableHead';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from '@material-ui/core/TableHead';
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

// Internal dependencies
import { RootState } from '../reducers/rootReducer'
import { TodoRestInterface } from "../interfaces/interfaces";
import TodoState from './todo-state';
import { todo_toggle_isCompleted_thunk,
	todo_edit_priority_thunk,
	todo_delete_thunk } from '../actions/todos-actions'

/*
 * *****************************************************************************
 * Prop configuration
 * *****************************************************************************
 */

// Set to null if not used
function mapStateToProps (state: RootState) {
	return {
		userName: state.authenticated_user_reducer,
		todoList: state.todo_reducer.slice(0),
		visibilityFilter: state.visibility_filter_reducer
	};
}

// Set to null if not used
const mapDispatchToProps = {
	todo_toggle_isCompleted_thunk: (todo: TodoRestInterface) => todo_toggle_isCompleted_thunk(todo),
	todo_edit_priority_thunk: (todo: TodoRestInterface, attribute: string) => todo_edit_priority_thunk(todo, attribute),
	todo_delete_thunk: (todo: TodoRestInterface) => todo_delete_thunk(todo)
}

// Hook them up; note that the static typing is constrained to what is in use
const connector = connect( mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

// Add own properties
type Props = PropsFromRedux & {}
// type Props = PropsFromRedux & {
// 	someOwnProperty: someOwnPropertyValue
// }

/*
 * *****************************************************************************
 * Styles configuration Start
 * *****************************************************************************
 */
const useStyles = makeStyles({
	table: {
		/* minWidth: 650, */
		tableLayout: "auto",
		width: "100%",
		'& .hide-todo-item': {
			display: 'none',
		},
	},
	todoTextFont: {
		fontSize: "1rem",
	},
	todoPriority: {
		width: "32px"
	},
	todoPriorityFont: {
		fontSize: "1rem"
	}
});

function computeVisible (visibilityFilter: string, isCompleted: boolean ): string {
	// console.log('TodoList/computeVisible visibilityFilter: ' + visibilityFilter)
	let className = 'show-todo-item';
	if ((visibilityFilter === 'open' && isCompleted) || (visibilityFilter === 'done' && !isCompleted)) {
		className = 'hide-todo-item';
	}
	return className;
}

// TodoList component
const TodoList = (props: Props) => {
	const classes = useStyles();
	
	const [textFieldValue, setTextFieldValue] = React.useState('');
	const [textFieldLabelValue, setTextFieldLabelValue] = React.useState('');
	
	const [textFieldPristine, seTextFieldPristine] = React.useState(true);
	const [textFieldValid, setTextFieldValid] = React.useState(true);
	const [textFieldLabelHide, setTextFieldLabelHide] = React.useState(true);
	
	const isOwner = (todo: TodoRestInterface): boolean => {
		return  todo.data.owner.name === props.userName
	}
	
	const renderTextField = (todo: TodoRestInterface): string => {
		let value = todo.data.text;
		return value;
	}
	
	const onMouseOverTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTextFieldLabelHide(false);
		setTextFieldValid(true);
		if (isOwner(todo)) {
			setTextFieldLabelValue('Enter text and navigate outside text box to update')
		} else {
			setTextFieldLabelValue('Must own to edit')
		}
	}
	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let valid = true;
		setTextFieldLabelValue('Enter text and navigate outside text box to update');
		seTextFieldPristine(false);

		setTextFieldValue(event.target.value);
		
		// If its length is zero
		if (event.target.value === "") {
			// its state is not valid
			valid = !valid;
		} else {
			// when the field has been touched and it has one or more characters
			// At least one of these characters must be non blank
			valid = /.*\S.*/.test(event.target.value);
		}
		
		if (!valid) {
			setTextFieldLabelValue('Must start with a non blank character and have at least one non-blank character')
		}
		
		// console.log("value: " + event.target.value);
		// console.log("value length: " + event.target.value.length);
		// console.log("valid: " + valid);
		setTextFieldValid(valid);
	};
	const handleTextKeyPress = () => {
		setTextFieldLabelHide(true);
		seTextFieldPristine(true);
	}
	const onMouseOutTextHandler = (todo: TodoRestInterface) => {
		setTextFieldLabelHide(true);
		seTextFieldPristine(true);
		
		// Restore original text
		if (!textFieldPristine)  {
			if (textFieldValid) {
				props.todo_priority_thunk(todo, textFieldValue)
			}
		}
	}
	
	return (
		<div>
			<Divider />
			<TableContainer component={Paper}>
				<Table className={classes.table} size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell>State</TableCell>
							<TableCell>Text</TableCell>
							<TableCell>Priority</TableCell>
							<TableCell>Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							props.todoList.length > 0
								?
								(
									props.todoList.map((todo: TodoRestInterface) => (
										<TableRow className={computeVisible(props.visibilityFilter, todo.data.isCompleted)}>
											<TableCell component="th" scope="row" >
												<TodoState todo={todo}/>
											</TableCell>
											<TableCell className={classes.todoTextFont}>
												<TextField
													id="standard-basic"
													value={todo.data.text}
													fullWidth
													disabled={!isOwner(todo)}
												/>
											</TableCell>
											<TableCell className={classes.todoPriority} >
												<Select className={classes.todoPriorityFont}
														labelId="demo-simple-select-label"
														id="demo-simple-select"
														value={todo.data.priority}
														onClick={ (e) => props.todo_edit_priority_thunk(todo, e.target.value)}
														disabled={!isOwner(todo)}
												>
													<MenuItem value={'LOW'}>LOW</MenuItem>
													<MenuItem value={'MEDIUM'}>MEDIUM</MenuItem>
													<MenuItem value={'HIGH'}>HIGH</MenuItem>
												</Select>
											</TableCell>
											<TableCell align="right" className={"todo-delete-me"}>
												<Tooltip title="delete">
													<IconButton
														aria-label="delete"
														onClick={() => props.todo_delete_thunk(todo)}
														disabled={!isOwner(todo)}
													>
														<DeleteIcon fontSize="small" />
													</IconButton>
												</Tooltip>
											</TableCell>
										</TableRow>
									))
								)
								:
								(
									<TableRow key='NONE'>
										{/*<TableCell component="th" scope="row" className={"todo-is- completed"}> </TableCell>*/}
										<TableCell className={"todo-item"} align={'center'}>
											<div>You are done</div>
										</TableCell>
										{/*<TableCell align="right" className={"todo-delete-me"}> </TableCell>*/}
									</TableRow>
								)
						}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default connector(TodoList)
