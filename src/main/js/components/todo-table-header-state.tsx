import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import classNames from 'classnames'
import {ITodoItemStates} from "../interfaces/interfaces";
import {todos_table_header_state_actions} from "../actions/todos-actions";

// Styles configuration
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
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
	todos_table_header_state_actions: (newState:  ITodoItemStates) => todos_table_header_state_actions(newState)
}

const connector = connect(mapStateToProps, mapDispatchToProps)

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>

// Add own properties
// type Props = PropsFromRedux & {}
type Props = PropsFromRedux & {
	title: string
}

const TodoTableHeaderState = (props: Props) => {
	const classes = useStyles();
	
	// Checkbox control
	const [state, setState] = React.useState({
		active: true,
		completed: true
	});
	const { active, completed } = state;
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.checked });

		let newState: ITodoItemStates = {
			[event.target.name]: event.target.checked
		}
		props.todos_table_header_state_actions(newState);
	};
	
	// State management
	const [showHeader, setShowHeader] = React.useState(true);
	const  _showHideHeader = (showHeader: boolean): string => {
		return showHeader ? classes.showHeader : classes.hideHeader
	}
	const  _showHideSelector = (showHeader: boolean): string => {
		return showHeader ? classes.hideSelector : classNames(classes.formControl, classes.showSelector)
	}
	const handleOnFocus = (): any => {
		setShowHeader(false);
		console.log('TodoTableHeaderState/handleOnFocus/showHeader: ' + showHeader);
	}
	const handleOnBlur = (): any => {
		setShowHeader(true);
		console.log('TodoTableHeaderState/handleOnBlur/showHeader: ' + showHeader);
		console.log('TodoTableHeaderState/handleOnBlur/state');
		console.log(state);
	}
	
	// Priority management
	// TBD
	
	console.log('TodoTableHeaderState/showHeader: ' + showHeader);
	console.log('TodoTableHeaderState, state');
	console.log(state);
	
	return (
		<div className={classes.root} onMouseEnter={handleOnFocus} onMouseLeave={handleOnBlur} >
			<div className={_showHideHeader(showHeader) }>{props.title}</div>
			<FormControl component="fieldset" className={_showHideSelector((showHeader))}>
				<FormLabel component="legend">State</FormLabel>
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
				<FormHelperText>Select State(s)</FormHelperText>
			</FormControl>
		</div>
	)
}
export default connector(TodoTableHeaderState)
