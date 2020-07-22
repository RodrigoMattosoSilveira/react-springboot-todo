// External Dependencies
import * as React from "react";
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from "../reducers/rootReducer";
import { makeStyles, createStyles, useTheme, Theme } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';

// Internal dependencies
import {set_rest_page_size_action_thunk} from "../actions/rest_actions";
import TodoTablePaginationActions from "./todo-table-pagination-actions";
import {IHalPage} from "../references/interfaces";
import {set_hal_page} from "../actions/hal-page-actions";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
	}
}));

/*
 * *****************************************************************************
 * Prop configuration
 * *****************************************************************************
 */

// Set to null if not used
// const mapStateToProps: any = null
const mapStateToProps = (state: RootState) => {
	return {
		size: state.hal_page_reducer.size,				// Number of records per page
		count: state.hal_page_reducer.totalElements,	// Number of records
		totalPages: state.hal_page_reducer.totalPages,	// Number of pages
		number: state.hal_page_reducer.number			// Page number, 0-based
	};
}

// Set to null if not used
// const mapDispatchToProps = null
const mapDispatchToProps = {
	set_rest_page_size_action_thunk: (pageSize: number) => set_rest_page_size_action_thunk(pageSize),
	set_hal_page: (halPage: IHalPage) => set_hal_page(halPage)
}

const connector = connect(mapStateToProps, mapDispatchToProps)

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>

// Add own properties
type Props = PropsFromRedux & {}
// type Props = PropsFromRedux & {
// someAttributeName: someAttributeNameValue
// }

const TodoTablePagination = (props: Props) => {
	// const classes = useStyles();
	//  console.log('TodoTablePagination/props.count: ' + props.count);
	//  console.log('TodoTablePagination/props.number (page number, 0-based): ' + props.number);
	//  console.log('TodoTablePagination/props.size (rowsPerPage): ' + props.size);
	
	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		const iHalPage: IHalPage = {number: newPage}
		console.log('Unexpected call');
		console.log('TodoTablePagination/handleChangePage/newPage: ' + newPage);
		// props.set_hal_page(iHalPage);
	};
	
	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const size =  parseInt(event.target.value, 10) === -1 ? props.count : parseInt(event.target.value, 10);
		props.set_rest_page_size_action_thunk(size);
	};
	
	return (
		<TablePagination
			rowsPerPageOptions={[1, 2, 3, 5, 8, 13, 21, { label: 'All', value: -1 }]}
			colSpan={5}
			count={props.count}
			rowsPerPage={props.size} // HAL property
			page={props.number}
			SelectProps={{
				inputProps: { 'aria-label': 'rows per page' },
				native: true,
			}}
			onChangePage={handleChangePage}
			onChangeRowsPerPage={handleChangeRowsPerPage}
			ActionsComponent={TodoTablePaginationActions}
		/>
	)
}

export default connector(TodoTablePagination)
