// External Dependencies
import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import classNames from 'classnames';
import {todos_table_header_state_actions} from "../actions/todos-actions";
import Popover from '@material-ui/core/Popover';
import Icon from '@material-ui/core/Icon';

// Internal dependencies
import {ITodoItemStateFilter} from "../interfaces/interfaces";

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
 * Prop configuration
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
	// const handleOnFocus = (event: React.ChangeEvent<HTMLInputElement>): void => {
	// 	setAnchorEl(event.currentTarget);
	// 	console.log('TodoTableStateFilter/handleOnFocus/event');
	// 	console.log(event);
	// }
	// const handleOnBlur = (event: React.ChangeEvent<HTMLInputElement>): void => {
	// 	setAnchorEl(null);
	// 	console.log('TodoTableStateFilter/handleOnBlur/state');
	// 	console.log(state);
	// }
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	
	const handleClose = () => {
		setAnchorEl(null);
	};
	
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	console.log('TodoTableStateFilter, open: ' + open);
	console.log('TodoTableStateFilter, ID: ' + id);
	console.log('TodoTableStateFilter, state');
	console.log(state);
	
	return (
		<div className={classes.root} >
			{/*<div*/}
			{/*	onMouseEnter={handleOnFocus}*/}
			{/*	onMouseLeave={handleOnBlur}*/}
			{/*>*/}
			{/*	{props.title}*/}
			{/*</div>*/}
			{/*<Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>*/}
			{/*	{props.title}*/}
			{/*</Button>*/}
			<Button onClick={handleClick} endIcon={<Icon>filter_list</Icon>}>{props.title}</Button>
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
					{/*<FormLabel component="legend">State</FormLabel>*/}
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
					{/*<FormHelperText>Select State(s)</FormHelperText>*/}
				</FormControl>
			</Popover>
		</div>
	)
}
export default connector(TodoTableStateFilter)
