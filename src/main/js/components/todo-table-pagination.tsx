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
// import { set_rest_page_size_action_thunk } from "../actions/rest_actions";

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
const mapStateToProps: any = null
// const mapStateToProps = (state: RootState) => {
// 	return {
// 		pageSize: state.rest_page_size_reducer
// 	};
// }

// Set to null if not used
const mapDispatchToProps: any = null
// const mapDispatchToProps = {
// 	set_rest_page_size_action_thunk: (pageSize: number) => set_rest_page_size_action_thunk(pageSize)
// }

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
	
	return (
		<div>Table Footer / Pagination </div>
	)
}

export default connector(TodoTablePagination)
