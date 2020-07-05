// External Dependencies
import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { APriorityFilter } from "../actions/todos-actions";
import Popover from '@material-ui/core/Popover';
import FilterListIcon from '@material-ui/icons/FilterList';

// Internal dependencies
import {IPrioritiesFilter} from "../references/interfaces";

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
	APriorityFilter: (newState:  IPrioritiesFilter) => APriorityFilter(newState)
}

const connector = connect(mapStateToProps, mapDispatchToProps)

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>

// Add own properties
// type Props = PropsFromRedux & {}
type Props = PropsFromRedux & {
	title: string
}

const TodoTablePriorityFilter = (props: Props) => {
	const classes = useStyles();
	
	// Checkbox control
	const [state, setState] = React.useState({
		low: true,
		medium: true,
		high: true
	});
	const { low, medium, high } = state;
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.checked });
		
		let newState: IPrioritiesFilter = {
			[event.target.name]: event.target.checked
		}
		props.APriorityFilter(newState);
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
	console.log('TodoTablePriorityFilter, open: ' + open);
	console.log('TodoTablePriorityFilter, ID: ' + id);
	console.log('TodoTablePriorityFilter, state');
	console.log(state);
	
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
							control={<Checkbox checked={low} onChange={handleChange} name="low" />}
							label="LOW"
						/>
						<FormControlLabel
							control={<Checkbox checked={medium} onChange={handleChange} name="medium" />}
							label="MEDIUM"
						/>
						<FormControlLabel
							control={<Checkbox checked={high} onChange={handleChange} name="high" />}
							label="HIGH"
						/>
					</FormGroup>
				</FormControl>
			</Popover>
		</div>
	)
}
export default connector(TodoTablePriorityFilter)
