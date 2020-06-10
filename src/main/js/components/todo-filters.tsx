// External Dependencies
import * as React from "react";
import {connect} from 'react-redux';
import {RootState} from "../reducers/rootReducer";
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LastPageIcon from '@material-ui/icons/LastPage';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import VerticalAlignCenterIcon from '@material-ui/icons/VerticalAlignCenter';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import Tooltip from '@material-ui/core/Tooltip';

// Internal dependencies
import {store} from "../services/store";
import * as REST_PARAMS from "../actions/rest_actions";
import {todo_load_from_server} from "../actions/todos-actions";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		marginTop: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	iconMargin: {
		margin: theme.spacing(1),
	},
	iconMarginCenter: {
		marginTop: 6,
		width: "75%",
		height: "75%",
	},
	fab: {
		margin: theme.spacing(2),
	},
	absolute: {
		position: 'absolute',
		bottom: theme.spacing(2),
		right: theme.spacing(3),
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
		pageSize: state.rest_page_size_reducer
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
const TodoFilters = (props: Props) => {
	const classes = useStyles();
	
	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid item xs={1}>
					<Tooltip title="First Page">
						<IconButton aria-label="delete" className={classes.iconMargin} size="small">
							<FirstPageIcon fontSize="large" />
						</IconButton>
					</Tooltip>
				</Grid>
				<Grid item xs={1}>
					<Tooltip title="Previous Page">
						<IconButton aria-label="delete" className={classes.iconMargin} size="small">
							<NavigateBeforeIcon fontSize="large"  />
						</IconButton>
					</Tooltip>
				</Grid>
				<Grid item xs={1}>
					<Tooltip title="Next Page">
						<IconButton aria-label="delete" className={classes.iconMargin} size="small">
							<NavigateNextIcon fontSize="large"  />
						</IconButton>
					</Tooltip>
				</Grid>
				<Grid item xs={1}>
					<Tooltip title="Last Page">
						<IconButton aria-label="delete" className={classes.iconMargin} size="small">
							<LastPageIcon fontSize="large" />
						</IconButton>
					</Tooltip>
				</Grid>
				<Grid item xs={4}>
				</Grid>
				<Grid item xs={1}>
					<Tooltip title="All">
						<IconButton aria-label="delete" className={classes.iconMargin} size="small">
							<AllInclusiveIcon fontSize="large" />
						</IconButton>
					</Tooltip>
				</Grid>
				<Grid item xs={1}>
					<Tooltip title="Low">
						<IconButton aria-label="delete" className={classes.iconMargin} size="small">
							<VerticalAlignBottomIcon fontSize="large" />
						</IconButton>
					</Tooltip>
				</Grid>
				<Grid item xs={1}>
					<Tooltip title="Middle">
						<IconButton aria-label="delete" className={classes.iconMargin} size="small">
							<VerticalAlignCenterIcon fontSize="large" />
						</IconButton>
					</Tooltip>
				</Grid>
				<Grid item xs={1}>
					<Tooltip title="High">
						<IconButton aria-label="delete" className={classes.iconMargin} size="small">
							<VerticalAlignTopIcon fontSize="large" />
						</IconButton>
					</Tooltip>
				</Grid>
			</Grid>
		</div>
	)}

export default connector(TodoFilters)
