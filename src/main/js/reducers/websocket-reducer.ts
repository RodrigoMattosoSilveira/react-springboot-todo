import {CONSOLE_LOG_MESSAGE_TYPE, HAL_ACTIONS} from '../references/references';
import {IWebsocketStore, IWebsocketAction} from '../references/interfaces';
import { WEBSOCKET_ACTIONS } from '../references/references'

const defaultWebSocketReducer: IWebsocketStore = {
	count: 0,			// the number of rows per page, a.k.a page size
	messages: []		// messages collected from websocket
};

export const webSocketReducer = (state = defaultWebSocketReducer, action: IWebsocketAction): IWebsocketStore => {
	const showInfoMessages = true;
	switch (action.type) {
		case WEBSOCKET_ACTIONS.ADD_MESSAGE:
			console.log('websocket-reducer/webSocketReducer/action/ADD_MESSAGE: ' + JSON.stringify(action))
			const newState: IWebsocketStore = {
				count: state.count + 1,
				messages: [...state.messages, action.message]
			}
			return newState;
		case WEBSOCKET_ACTIONS.REMOVE_MESSAGES:
			console.log('websocket-reducer/webSocketReducer/action/REMOVE_MESSAGES: ' + JSON.stringify(action))
			return defaultWebSocketReducer;
		default:
			return state;
	}
}
