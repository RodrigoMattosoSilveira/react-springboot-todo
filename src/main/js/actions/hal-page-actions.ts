import {HAL_ACTIONS} from "../references/references";
import {IHalPage, IHalPageAction} from "../interfaces/interfaces";

export const set_hal_page = (halPage: IHalPage): IHalPageAction => ({
	type: HAL_ACTIONS.SET_HAL_PAGE,
	halPage: halPage,
})
