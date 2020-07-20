import {REST_ACTIONS, WEBSOCKET_ACTIONS} from '../references/references';
import {IWebSocketMessage, RestAttributesActionInterface} from '../references/interfaces';


export const websocket_add_message_action = (message: IWebSocketMessage): IWebSocketMessage => ({
	type: WEBSOCKET_ACTIONS.ADD_MESSAGE,
	message: message,
});

export const websocket_remove_messages = (): IWebSocketMessage => ({
	type: WEBSOCKET_ACTIONS.REMOVE_MESSAGES,
	message: null
});

export const  websocket_new_todo_message_thunk = (message: any) =>
	(dispatch: any, getState: any, axios: any) => {
	console.log
		dispatch(websocket_add_message_action(message));
	}
	
export const  websocket_update_todo_message_thunk = (message: any) =>
	(dispatch: any, getState: any, axios: any) => {
		dispatch(websocket_add_message_action(message));
	}

export const  websocket_delete_todo_message_thunk = (message: any) =>
	(dispatch: any, getState: any, axios: any) => {
		dispatch(websocket_add_message_action(message));
	}

