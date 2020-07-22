import { REST_ACTIONS } from '../references/references';
import { RestAttributesActionInterface } from '../references/interfaces';
import { RestPageSizeActionInterface } from '../references/interfaces';
import { RestLinksActionInterface } from '../references/interfaces';
import { PaginationLinks } from '../references/interfaces';
import { IRestRootAction } from '../references/interfaces';

export const rest_attributes_reducer = (state = '', action: RestAttributesActionInterface): any => {
    switch (action.type) {
        case REST_ACTIONS.SET_REST_ATTRIBUTES:
            return action.attributes;
        default:
            return state;
    }
}

export const rest_page_size_reducer = (state = 3, action: RestPageSizeActionInterface): number => {
	switch (action.type) {
		case REST_ACTIONS.SET_REST_PAGE_SIZE:
			// console.log('rest_page_size_reducer: ' + JSON.stringify(action));
			return action.pageSize;
		default:
			return state;
	}
}

export const rest_links_reducer = (state: PaginationLinks = {}, action: RestLinksActionInterface): any => {
	switch (action.type) {
		case REST_ACTIONS.SET_REST_LINKS:
			return action.links;
		default:
			return state;
	}
}

export const rest_root_reducer = (state: string = ' /api', action: IRestRootAction): any => {
	switch (action.type) {
		case REST_ACTIONS.SET_REST_ROOT:
			return action.root;
		default:
			return state;
	}
}
