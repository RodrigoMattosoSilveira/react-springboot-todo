// External Dependencies
import * as React from "react";
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from "../reducers/rootReducer";
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


// Internal dependencies
// import { set_rest_page_size_action_thunk } from "../actions/rest_actions";
import {PAGINATION_TYPE} from "../references/references";
import {todo_navigate_to_page_thunk} from "../actions/todos-actions";
import { IHalPage } from "../references/interfaces";
import { set_hal_page } from "../actions/hal-page-actions"

/*
 * *****************************************************************************
 * Prop configuration
 * *****************************************************************************
 */

// Set to null if not used
// const mapStateToProps: any = null
const mapStateToProps = (state: RootState) => {
	return {
		links: state.rest_links_reducer,
		halPage: state.hal_page_reducer
	};
}

// Set to null if not used
// const mapDispatchToProps: any = null
const mapDispatchToProps = {
	todo_navigate_to_page_thunk: (navUri: string, pageNumber: number) => todo_navigate_to_page_thunk(navUri, pageNumber),
	set_hal_page: (halPage: IHalPage) => set_hal_page(halPage)
}

const connector = connect(mapStateToProps, mapDispatchToProps)

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>

// Add own properties
type Props = PropsFromRedux & {}
// type Props = PropsFromRedux & {
// 	onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: string) => void;
// }

/*
 * *****************************************************************************
 * Styles configuration
 * *****************************************************************************
 */
const useStyles1 = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexShrink: 0,
			marginLeft: theme.spacing(2.5),
		},
	}),
);

const TodoTablePaginationActions = (props: Props) => {
	const classes = useStyles1();
	const theme = useTheme();
	const [page, setPage] = React.useState(props.halPage.number);
	
	const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const newPage = 0;
		handleNav(PAGINATION_TYPE.FIRST, newPage)
	};
	
	const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const newPage = page - 1;
		handleNav(PAGINATION_TYPE.PREVIOUS, newPage)
	};
	
	const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const newPage = page + 1;
		handleNav(PAGINATION_TYPE.NEXT, newPage)
	};
	
	const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const newPage = props.halPage.totalPages - 1;
		handleNav(PAGINATION_TYPE.LAST, newPage)
	};
	
	
	const handleNav = (paginationType: string, newPage: number) => {
		const url = props.links[paginationType]['href'];
		setPage(newPage);
		// console.log('TodoTablePaginationActions/newPage: ' + newPage);
		props.todo_navigate_to_page_thunk(url, newPage);
	}
	
	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={!props.links.hasOwnProperty(PAGINATION_TYPE.FIRST)}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={!props.links.hasOwnProperty(PAGINATION_TYPE.PREVIOUS)}
				aria-label="previous page">
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={!props.links.hasOwnProperty(PAGINATION_TYPE.NEXT)}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={!props.links.hasOwnProperty(PAGINATION_TYPE.LAST)}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	)
}

export default connector(TodoTablePaginationActions)
