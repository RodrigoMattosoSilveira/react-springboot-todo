// External dependencies
import * as React from 'react'
import {connect, ConnectedProps} from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
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
import { todo_toggle_isCompleted_thunk } from '../actions/todos-actions'

/*
 * *****************************************************************************
 * This is the heart of the component
 * *****************************************************************************
 */

// Comment out if not used
// interface OwnProps {
// }

// Set to null if not used
function mapStateToProps (state: RootState) {
	return {
		todoList: state.todo_reducer.slice(0),
		visibilityFilter: state.visibility_filter_reducer
	};
}

// Set to null if not used
const mapDispatchToProps = {
	todo_toggle_isCompleted_thunk: (todo: TodoRestInterface) => todo_toggle_isCompleted_thunk(todo),
	todo_update: (todo: TodoRestInterface) => todo_update(todo),
	todo_delete: (todo: TodoRestInterface) => todo_delete(todo)
}

// Hook them up; note that the static typing is constrained to what is in use
const connector = connect(
	mapStateToProps,
	mapDispatchToProps
)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}
// type Props = PropsFromRedux & {
// 	backgroundColor: string
// }


/*
 * *****************************************************************************
 * End of the heart of the component
 * *****************************************************************************
 */

/*
 * *****************************************************************************
 * Temporary ... replace with actions
 * *****************************************************************************
 */
// const todo_toggle = (id: string) => {
//  	console.log('TodoList/todo_toggle id = ' + id);
// }
const todo_update = (todo: TodoRestInterface) => {
	console.log('TodoList/todo_update href = ' + todo.data._links.self.href);
}
const todo_delete = (todo: TodoRestInterface) => {
	console.log('TodoList/todo_delete href = ' + todo.data._links.self.href);
}

function computeVisible (visibilityFilter: string, isCompleted: boolean ): string {
	// console.log('TodoList/computeVisible visibilityFilter: ' + visibilityFilter)
	let className = 'show-todo-item';
	if ((visibilityFilter === 'open' && isCompleted) || (visibilityFilter === 'done' && !isCompleted)) {
		className = 'hide-todo-item';
	}
	return className;
}

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

const computeState = (isCompleted: boolean) => {
	return isCompleted ? (
		<span className="todo-item-state todo-item-checked">✔</span>
	) : (
		<span className="todo-item-state todo-item-unchecked" />
	);
};

// TodoList component
const TodoList = (props: Props) => {
	const classes = useStyles();
	
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
											<TableCell
												component="th"
												scope="row"
												className={"todo-is-completed"}
												onClick={() => props.todo_toggle_isCompleted_thunk(todo)}
											>
												{computeState(todo.data.isCompleted)}
											</TableCell>
											<TableCell className={classes.todoTextFont}>
												<TextField
													id="standard-basic"
													value={todo.data.text}
													onMouseOut={() => props.todo_update(todo)}
													fullWidth />
											</TableCell>
											<TableCell className={classes.todoPriority}>
												<Select className={classes.todoPriorityFont}
														labelId="demo-simple-select-label"
														id="demo-simple-select"
														value={todo.data.priority}
														onClick={() => props.todo_update(todo)}
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
														onClick={() => props.todo_delete(todo)}
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
