// External dependencies
import * as React from 'react'
import {connect, ConnectedProps} from 'react-redux';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AssignmentSharpIcon from '@material-ui/icons/Assignment';

// Internal dependencies
import {RootState} from "../reducers/rootReducer";
import {TodoRestInterface} from "../references/interfaces";
import { todo_delete_thunk } from "../actions/todos-actions";
import { consoleMessage } from "../services/console-log"
import { CONSOLE_LOG_MESSAGE_TYPE} from "../references/references";
import { websocket_remove_messages } from '../actions/websocket-actions';


/*
 * *****************************************************************************
 * Prop configuration
 * *****************************************************************************
 */

// Set to null if not used
// const mapStateToProps: any = null
function mapStateToProps (state: RootState) {
	return {
		websocketMessageCount: state.webSocketReducer.count,
	};
}

// Set to null if not used
// const mapDispatchToProps: any = null
const mapDispatchToProps = {
	websocket_remove_messages: () => websocket_remove_messages
}

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
			right: 0,
			top: 0,
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
			right: -4,
			top: 20,
			border: `2px solid ${theme.palette.background.paper}`,
			padding: '0 4px',
		},
	}),
)(Badge);

const WebSocketInfoBadge = (props: Props) => {
	const classes = useStyles();
	const showInfoLogMessages = true
	
	const handleClick = () => {
		consoleMessage('Handling WebSocketInfoBadge/handleClick', CONSOLE_LOG_MESSAGE_TYPE.INFO, showInfoLogMessages)
		props.websocket_remove_messages();
	}
	
	return (
		<IconButton aria-label="delete" onClick={handleClick} className={classes.styleRight}>
			<Badge badgeContent={props.websocketMessageCount} color="error" >
					<AssignmentSharpIcon />
			</Badge>
		</IconButton>
	)
}
export default connector(WebSocketInfoBadge)
