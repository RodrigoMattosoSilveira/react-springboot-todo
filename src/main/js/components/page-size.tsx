// External Dependencies
import * as React from "react";
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from "../reducers/rootReducer";
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import SaveIcon from "@material-ui/icons/Save";

// Internal dependencies
import { set_rest_page_size_action_thunk } from "../actions/rest_actions";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	appbarPageSize: {
		backgroundColor: "#f2f2f2",
	},
	button: {
		margin: theme.spacing(1),
	},
	
}));


/*
 * *****************************************************************************
 * Prop configuration
 * *****************************************************************************
 */

// Set to null if not used
// const mapStateToProps = null
const mapStateToProps = (state: RootState) => {
	return {
		pageSize: state.rest_page_size_reducer
	};
}

// Set to null if not used
// const mapDispatchToProps = null
const mapDispatchToProps = {
	set_rest_page_size_action_thunk: (pageSize: number) => set_rest_page_size_action_thunk(pageSize)
}

const connector = connect(mapStateToProps, mapDispatchToProps)

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>

// Add own properties
type Props = PropsFromRedux & {}
// type Props = PropsFromRedux & {
// someAttributeName: someAttributeNameValue
// }

const PageSize = (props: Props) => {
	const classes = useStyles();
	const [pageSize, setPageSize] = React.useState(props.pageSize);
	const [pageSizeValid, setPageSizeValid] = React.useState(true);
	const [pageSizePristine, setPageSizePristine] = React.useState(true);
	
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log('PageSize/handleChange/value: ' + event.target.value);
		
		if (event.target.value.length === 0) {
			setPageSizePristine(true);
			setPageSizeValid(true);
		}
		else {
			setPageSizePristine(false);
			setPageSizeValid(/^\d+$/.test(event.target.value))
		}
		setPageSize(+event.target.value as number);
	};
	const savePageSize = () => {
		console.log("PageSize/Saving pageSize: " + pageSize);
		// props.todo_add(textFieldValue, priorityFieldValue);
		setPageSizePristine(true);
		props.set_rest_page_size_action_thunk(+pageSize)
	}
	
	return (
		<AppBar position="static" className={classes.appbarPageSize}>
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					<TextField
						id="standard-basic"
						value={pageSize}
						onChange={handleChange}
						error={!pageSizeValid}
						helperText={
							pageSizeValid
								? "Page Size"
								: "Must be only digits"
						}
						fullWidth
					/>
				</Typography>
					New Page Size:
					<Button
						variant="contained"
						color="primary"
						size="small"
						className={classes.button}
						disabled={pageSizePristine || !pageSizeValid}
						startIcon={<SaveIcon />}
						onClick={savePageSize}
					>
						Save
					</Button>
			
			</Toolbar>
		</AppBar>
	)
}

export default connector(PageSize)
