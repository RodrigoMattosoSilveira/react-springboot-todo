import {REST_ACTIONS, WEBSOCKET_ACTIONS} from '../references/references';
import {IWebSocketMessage, RestAttributesActionInterface} from '../references/interfaces';
import {todo_load_from_server, todo_navigate_to_page_thunk} from "./todos-actions";


export const websocket_add_message_action = (message: IWebSocketMessage): IWebSocketMessage => ({
	type: WEBSOCKET_ACTIONS.ADD_MESSAGE,
	message: message,
});

export const websocket_remove_messages = (): IWebSocketMessage => ({
	type: WEBSOCKET_ACTIONS.REMOVE_MESSAGES,
	message: ''
});

export const  websocket_remove_messages_thunk = (navUri: string, pageNumber: number) =>
	(dispatch: any, getState: any, axios: any) => {
		console.log('websocket_remove_messages_thunk/navUri: ' + navUri);
		dispatch(websocket_remove_messages());
		// dispatch(todo_navigate_to_page_thunk(navUri, pageNumber));
		dispatch(todo_load_from_server());
	}

export const  websocket_new_todo_message_thunk = (message: any) =>
	(dispatch: any, getState: any, axios: any) => {
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

