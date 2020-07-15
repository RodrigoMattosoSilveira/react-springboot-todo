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
		count: state.hal_page_reducer.totalElements,
		rowsPerPage: state.hal_page_reducer.size,
		page: state.hal_page_reducer.number
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
	// console.log('TodoTablePagination/props.count: ' + props.count);
	// console.log('TodoTablePagination/props.page: ' + props.page);
	// console.log('TodoTablePagination/props.rowsPerPage: ' + props.rowsPerPage);
	
	const [page, setPage] = React.useState(props.page);
	// TODO: why is that page is initialized to zero instead of props.page?
	// console.log('TodoTablePagination/page: ' + props.page);
	
	const [rowsPerPage, setRowsPerPage] = React.useState(3); //TODO find out why props.rowsPerPage does not work
	// console.log('TodoTablePagination/rowsPerPage: ' + rowsPerPage);
	
	
	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
		const iHalPage: IHalPage = {number: page}
		// console.log('TodoTablePagination/handleChangePage/newPage: ' + newPage);
		props.set_hal_page(iHalPage);
	};
	
	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const size =  parseInt(event.target.value, 10) === -1 ? props.count : parseInt(event.target.value, 10);
		setRowsPerPage (size);
		props.set_rest_page_size_action_thunk(size);
	};
	
	return (
		<TablePagination
			rowsPerPageOptions={[1, 2, 3, 5, 8, 13, 21, { label: 'All', value: -1 }]}
			colSpan={5}
			count={props.count}
			rowsPerPage={props.rowsPerPage}
			page={props.page}
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
