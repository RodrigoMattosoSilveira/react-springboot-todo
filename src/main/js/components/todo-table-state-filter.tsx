// External Dependencies
import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {todos_table_header_state_actions} from "../actions/todos-actions";
import Popover from '@material-ui/core/Popover';
import FilterListIcon from '@material-ui/icons/FilterList';

// Internal dependencies
import {ITodoItemStateFilter} from "../references/interfaces";
import {consoleMessage} from "../services/console-log";
import {CONSOLE_LOG_MESSAGE_TYPE} from "../references/references";

// Styles configuration
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		typography: {
			padding: theme.spacing(2),
		},
		formControl: {
			margin: theme.spacing(1),
		},
		showHeader: {
			display: 'inline-flex',
		},
		hideHeader: {
			display: 'none',
		},
		showSelector: {
			display: 'inline-flex',
		},
		hideSelector: {
			display: 'none',
		},
	}),
);

/*
 * *****************************************************************************
 * Prop configuration ... do not remove the comments
 * *****************************************************************************
 */

// Set to null if not used
const mapStateToProps: any = null
// const mapStateToProps = (state: RootState) => {
// 	return {
// 		count: state.hal_page_reducer.totalElements,
// 		rowsPerPage: state.hal_page_reducer.size,
// 		page: state.hal_page_reducer.number,
// 	};
// }

// Set to null if not used
// const mapDispatchToProps: any = null
const mapDispatchToProps = {
	todos_table_header_state_actions: (newState:  ITodoItemStateFilter) => todos_table_header_state_actions(newState)
}

const connector = connect(mapStateToProps, mapDispatchToProps)

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>

// Add own properties
// type Props = PropsFromRedux & {}
type Props = PropsFromRedux & {
	title: string
}

const TodoTableStateFilter = (props: Props) => {
	const classes = useStyles();
	
	// Checkbox control
	const [state, setState] = React.useState({
		active: true,
		completed: true
	});
	const { active, completed } = state;
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.checked });

		let newState: ITodoItemStateFilter = {
			[event.target.name]: event.target.checked
		}
		props.todos_table_header_state_actions(newState);
	};
	
	// State management
	// Get current element with onMouseOver or onMouseEnter in React
	// https://linguinecode.com/post/get-current-element-react-onmouseover-or-onmouseenter
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	consoleMessage(
		'TodoTableStateFilter, open: ' + open + ', ID: ' + id + ', state: ' + JSON.stringify(state),
		CONSOLE_LOG_MESSAGE_TYPE.INFO,
		false
	);
	
	return (
		<div className={classes.root} >
			<Button onClick={handleClick} endIcon={<FilterListIcon></FilterListIcon>}>{props.title}</Button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<FormControl component="fieldset" className={classes.formControl}>
					<FormGroup>
						<FormControlLabel
							control={<Checkbox checked={active} onChange={handleChange} name="active" />}
							label="active"
						/>
						<FormControlLabel
							control={<Checkbox checked={completed} onChange={handleChange} name="completed" />}
							label="completed"
						/>
					</FormGroup>
				</FormControl>
			</Popover>
		</div>
	)
}
export default connector(TodoTableStateFilter)
