// External Dependencies
import * as React from "react";
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from "../reducers/rootReducer";
import { makeStyles, Theme } from '@material-ui/core/styles';
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
import { todo_navigate_to_page_thunk } from "../actions/todos-actions";
import { PAGINATION_TYPE } from "../references/references";

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
		links: state.rest_links_reducer
	};
}

// Set to null if not used
const mapDispatchToProps = {
	todo_navigate_to_page: (navUri: string) => todo_navigate_to_page_thunk(navUri)
};

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
const TodoFilters = (props: Props) => {
	const classes = useStyles();
	
	const paginationTypeAvailable = (paginationType: string) => {
		return  props.links.hasOwnProperty(paginationType);
	}
	
	const handleNavFirst = () => {
		handleNav(PAGINATION_TYPE.FIRST)
	}
	
	const handleNavPrev = () => {
		handleNav(PAGINATION_TYPE.PREVIOUS)
	}
	
	const handleNavNext = () => {
		handleNav(PAGINATION_TYPE.NEXT)
	}
	
	const handleNavLast = () => {
		handleNav(PAGINATION_TYPE.LAST)
	}
	
	const handleNav = (paginationType: string) => {
		const url = props.links[paginationType]['href'];
		props.todo_navigate_to_page(url);
	}
	
	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid item xs={1}>
					<Tooltip title="First Page">
						<IconButton
							disabled={!(paginationTypeAvailable(PAGINATION_TYPE.FIRST))}
							aria-label="delete" className={classes.iconMargin}
							size="small"
							onClick={() => handleNavFirst()}>
							<FirstPageIcon fontSize="large" />
						</IconButton>
					</Tooltip>
				</Grid>
				<Grid item xs={1}>
					<Tooltip title="Previous Page">
						<IconButton
							disabled={!paginationTypeAvailable(PAGINATION_TYPE.PREVIOUS)}
							aria-label="delete"
							className={classes.iconMargin}
							size="small"
							onClick={() => handleNavPrev()}>
							<NavigateBeforeIcon fontSize="large"  />
						</IconButton>
					</Tooltip>
				</Grid>
				<Grid item xs={1}>
					<Tooltip title="Next Page">
						<IconButton
							disabled={!paginationTypeAvailable(PAGINATION_TYPE.NEXT)}
							aria-label="delete"
							className={classes.iconMargin}
							size="small"
							onClick={() => handleNavNext()}>
							<NavigateNextIcon fontSize="large"  />
						</IconButton>
					</Tooltip>
				</Grid>
				<Grid item xs={1}>
					<Tooltip title="Last Page">
						<IconButton
							disabled={!paginationTypeAvailable(PAGINATION_TYPE.LAST)}
							aria-label="delete"
							className={classes.iconMargin}
							size="small"
							onClick={() => handleNavLast()}>
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
