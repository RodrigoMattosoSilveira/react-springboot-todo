import {HAL_ACTIONS} from '../references/references';
import {IHalPage, IHalPageAction} from '../references/interfaces';

const defaultHalPage: IHalPage = {
	number: 0,			// the number of rows per page, a.k.a page size
	size: 0, 		// the number of domain rows
	totalElements: 0, 	// the number of pages based on the page size
	totalPages: 0		// the current page number

};

export const hal_page_reducer = (state = defaultHalPage, action: IHalPageAction): IHalPage => {
	switch (action.type) {
		case HAL_ACTIONS.SET_HAL_PAGE:
			return {... action.halPage};
		default:
			return state;
	}
}
