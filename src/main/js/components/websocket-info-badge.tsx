// External dependencies
import * as React from 'react'
import {connect, ConnectedProps} from 'react-redux';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import AssignmentSharpIcon from '@material-ui/icons/Assignment';

// Internal dependencies
import {RootState} from "../reducers/rootReducer";
import {TodoRestInterface} from "../references/interfaces";
import { todo_delete_thunk } from "../actions/todos-actions";


/*
 * *****************************************************************************
 * Prop configuration
 * *****************************************************************************
 */

// Set to null if not used
const mapStateToProps: any = null
// function mapStateToProps (state: RootState) {
// 	return {
// 		userName: state.authenticated_user_reducer,
// 	};
// }

// Set to null if not used
const mapDispatchToProps: any = null
// const mapDispatchToProps = {
// 	todo_delete_thunk: (todo: TodoRestInterface) => todo_delete_thunk(todo)
// }

const connector = connect(mapStateToProps, mapDispatchToProps)

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>

// Add own properties
type Props = PropsFromRedux & {}
//
// type Props = PropsFromRedux & {
// 	todo: TodoRestInterface
// }

/*
 * *****************************************************************************
 * Styles configuration
 * *****************************************************************************
 */
// const useStyles = makeStyles((theme: Theme) => ({}));
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		badge: {
			right: -3,
			top: 13,
			border: `2px solid ${theme.palette.background.paper}`,
			padding: '0 4px',
		},
		styleLeft: {
			textAlign: "center",
			float: "left",
		},
		styleRight: {
			textAlign: "center",
			float: "right",
			paddingTop: "20px"
		},
	})
);

const StyledBadge = withStyles((theme: Theme) =>
	createStyles({
		badge: {
			right: -3,
			top: 13,
			border: `2px solid ${theme.palette.background.paper}`,
			padding: '0 4px',
		},
	}),
)(Badge);

const WebSocketInfoBadge = (props: Props) => {
	const classes = useStyles();
	
	return (
		<StyledBadge badgeContent={4} color="error" className={classes.styleRight}>
			<AssignmentSharpIcon />
		</StyledBadge>
	)
}
export default connector(WebSocketInfoBadge)
