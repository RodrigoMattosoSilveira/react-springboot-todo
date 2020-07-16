// External dependencies
import * as React from 'react'
import {connect, ConnectedProps} from 'react-redux';
// import { makeStyles, Theme } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Table from "@material-ui/core/Table";
import TableHead from '@material-ui/core/TableHead';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';


// Internal dependencies
import {RootState} from "../reducers/rootReducer";
import { todo_add_thunk } from "../actions/todos-actions";
import {TODO_COMPLETED} from "../references/references";

/*
 * *****************************************************************************
 * Prop configuration
 * *****************************************************************************
 */

// Set to null if not used
function mapStateToProps (state: RootState) {
	return {
		userName: state.authenticated_user_reducer,
		pageSize: state.rest_page_size_reducer
	};
}

// Set to null if not used
const mapDispatchToProps = {
	todo_add_thunk: (newTodo: {}, pageSize: number) => todo_add_thunk(newTodo, pageSize)
}

const connector = connect(mapStateToProps, mapDispatchToProps)

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>

// Add own properties
type Props = PropsFromRedux & {}
/*
 * *****************************************************************************
 * Styles configuration
 * *****************************************************************************
 */
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		todoPriority: {
			width: "32px"
		},
		todoTextFont: {
			fontSize: "1rem",
		},
	}),
);


const TodoAddItem = (props: Props) => {
	const classes = useStyles();
	
	// State management
	// Get current element with onMouseOver or onMouseEnter in React
	// https://linguinecode.com/post/get-current-element-react-onmouseover-or-onmouseenter
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
		console.log("Adding Todo Item");
	};
	const handleClose = () => {
		setAnchorEl(null);
		if (!pristine && textFieldValid) {
			console.log("Added Todo Item");
			console.log("isCompleted: " + isCompletedChecked);
			console.log("text: " + textFieldValue);
			console.log("priority: " + priorityValue);
			props.todo_add_thunk({
				isCompleted: isCompletedChecked ? TODO_COMPLETED.TRUE : TODO_COMPLETED.FALSE,
				text: textFieldValue,
				priority: priorityValue
			}, props.pageSize)
		} else {
			console.log("Invalid text field");
		}
		
		// reset everyone
		setIsCompletedChecked(false);
		setTextFieldValue('');
		setPriorityValue('LOW');
	};
	
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	 console.log('TodoTablePriorityFilter, open: ' + open);
	 console.log('TodoTablePriorityFilter, ID: ' + id);
	 console.log('TodoTablePriorityFilter, state');
	
	// isCompleted
	const [isCompletedChecked, setIsCompletedChecked] = React.useState(false);
	const isCompletedHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsCompletedChecked(event.target.checked);
	};
	
	// text field
	const [textFieldValid, setTextFieldValid] = React.useState(true);
	const [textFieldValue, setTextFieldValue] = React.useState('');
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
		setTextFieldValid(valid);
	}
	
	const helperTextToShow = (): string => {
		let textToShow = '';
		if (!textFieldValid) {
			textToShow = 'Must have at least one non-blank character'
		}
		return textToShow;
	}
	
	// Priority
	const [priorityValue, setPriorityValue] = React.useState('LOW');
	const priorityHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPriorityValue((event.target as HTMLInputElement).value);
	};
	
	return (
		<div className={classes.root} >
			<Button onClick={handleClick} endIcon={<AddIcon></AddIcon>}><h3>ADD TODO</h3></Button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
			>
				<TableContainer component={Paper}>
					<Table style={{ width: 'auto', tableLayout: 'auto' }} size="small" aria-label="a dense table" stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell align={'center'} component="th" scope="row" style={{ width: '5%' }}>DONE</TableCell>
								<TableCell>TEXT</TableCell>
								<TableCell>PRIORITY</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow >
								<TableCell component="th" scope="row" align={'center'}>
									<Checkbox
										checked={isCompletedChecked}
										onChange={isCompletedHandleChange}
										inputProps={{ 'aria-label': 'primary checkbox' }}
									/>
								</TableCell>
								<TableCell className={classes.todoTextFont}>
									<form className={classes.root} noValidate autoComplete="off">
										<TextField
											id="standard-basic"
											value={textFieldValue}
											onChange={handleChange}
											error={!textFieldValid}
											helperText={helperTextToShow()}
											fullWidth
										/>
									</form>
								</TableCell>
								<TableCell className={classes.todoPriority} >
									<FormControl component="fieldset">
										<RadioGroup aria-label="gender" name="gender1" value={priorityValue} onChange={priorityHandleChange}>
											<FormControlLabel value="LOW" control={<Radio />} label="LOW" />
											<FormControlLabel value="MEDIUM" control={<Radio />} label="MEDIUM" />
											<FormControlLabel value="HIGH" control={<Radio />} label="HIGH" />
										</RadioGroup>
									</FormControl>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Popover>
		</div>
	)
}
export default connector(TodoAddItem)
