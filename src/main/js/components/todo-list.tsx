// External dependencies
import * as React from 'react'
import {connect, ConnectedProps} from 'react-redux';
import { makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableHead from '@material-ui/core/TableHead';
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

// Internal dependencies
import { RootState } from '../reducers/rootReducer'
import { TodoRestInterface } from "../interfaces/interfaces";
import TodoTableHeaderState from './todo-table-header-state';
import TodoState from './todo-state';
import TodoPriority from "./todo-priority";
import TodoDelete from './todo-delete';
import TodoTablePagination from './todo-table-pagination';
import { todo_toggle_isCompleted_thunk,
	todo_edit_priority_thunk,
	todo_delete_thunk } from '../actions/todos-actions'
import TodoText from "./todo-text.ts";
import {TODO_ITEM_PRIORITY} from "../references/references";

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
		visibilityFilter: state.visibility_filter_reducer,
		todo_item_state_filter: state.todo_item_state_reducer,
		todo_item_priority_filter: state.todo_item_priority_reducer
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
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		formControl: {
			margin: theme.spacing(3),
		},
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
		},
	})
);

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
	const showThisRow = (todo: TodoRestInterface): boolean => {
		let _showThisRowState = false;
		if (todo.data.isCompleted === false && props.todo_item_state_filter.active ||
			todo.data.isCompleted === true && props.todo_item_state_filter.completed) {
			_showThisRowState = true
		}
		
		let _showThisRowPriority = false;
		if (todo.data.priority === TODO_ITEM_PRIORITY.LOW && props.todo_item_priority_filter.low ||
			todo.data.priority === TODO_ITEM_PRIORITY.MEDIUM && props.todo_item_priority_filter.medium ||
			todo.data.priority === TODO_ITEM_PRIORITY.HIGH && props.todo_item_priority_filter.high
		) {
			_showThisRowPriority = true
		}
		
		return _showThisRowState && _showThisRowPriority;
	}
	
	return (
		<div>
			<Divider />
			<TableContainer component={Paper}>
				<Table className={classes.table} size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell colSpan={5} align={'center'}><h1>Todo Table</h1></TableCell>
						</TableRow>
					</TableHead>
					<TableHead>
						<TableRow>
							<TableCell>
								<TodoTableHeaderState title='State'></TodoTableHeaderState>
							</TableCell>
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
									props.todoList.map((todo: TodoRestInterface) => {
										if (showThisRow(todo)) {
											return (
												<TableRow className={computeVisible(props.visibilityFilter, todo.data.isCompleted)}>
													<TableCell component="th" scope="row" ><TodoState todo={todo}/></TableCell>
													<TableCell className={classes.todoTextFont}><TodoText todo={todo}/> </TableCell>
													<TableCell className={classes.todoPriority} ><TodoPriority todo={todo}/></TableCell>
													<TableCell align="right" className={"todo-delete-me"}><TodoDelete todo={todo}/></TableCell>
												</TableRow>
											)
										}
										}
									)
								)
								:
								(
									<TableRow key='NONE'>
										<TableCell className={"todo-item"} align={'center'}>
											<div>You are done</div>
										</TableCell>
									</TableRow>
								)
						}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TodoTablePagination/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</div>
	)
}

export default connector(TodoList)
