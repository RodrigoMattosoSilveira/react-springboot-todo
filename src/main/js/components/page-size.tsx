// External Dependencies
import * as React from "react";
import {connect} from 'react-redux';
import {RootState} from "../reducers/rootReducer";
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import SaveIcon from "@material-ui/icons/Save";
import {store} from "../services/store";
import * as REST_PARAMS from "../actions/rest_parameters_actions";
import {todos_read_thunk} from "../actions/todos-actions";

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
 * This is the heart of the component
 * *****************************************************************************
 */

// Comment out if not used
// interface OwnProps {
// }

// Set to null if not used
function mapStateToProps (state: RootState) {
	return {
		pageSize: state.rest_parameter_page_size_reducer
	};
}

// Set to null if not used
const mapDispatchToProps: any = null;

// Hook them up; note that the static typing is constrained to what is in use
const connector = connect(
	mapStateToProps,
	mapDispatchToProps
)
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps
type Props = StateProps & DispatchProps
// type Props = StateProps & DispatchProps & OwnProps;

/*
 * *****************************************************************************
 * End of the heart of the component
 * *****************************************************************************
 */
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
		setPageSize(event.target.value);
	};
	const savePageSize = () => {
		console.log("PageSize: " + pageSize);
		// props.todo_add(textFieldValue, priorityFieldValue);
		setPageSizePristine(true);
		store.dispatch(REST_PARAMS.set_rest_parameter_page_size_action(pageSize));
		store.dispatch(todos_read_thunk());
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
