import { CONSOLE_LOG_MESSAGE_TYPE} from "../references/references";
export const consoleMessage = (message: string, type: string, show: boolean) => {
	switch (type) {
		case CONSOLE_LOG_MESSAGE_TYPE.INFO:
			if (show) { console.info(message); }
			break;
		case CONSOLE_LOG_MESSAGE_TYPE.WARN:
			if (show) { console.warn(message); }
			break;
		case CONSOLE_LOG_MESSAGE_TYPE.ERROR:
			if (show) { console.error(message); }
			break;
		default:
			if (show) { console.info(message); }
			break
	}
}
