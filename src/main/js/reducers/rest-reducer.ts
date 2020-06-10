import { REST_ACTIONS } from '../references/references';
import { RestAttributesActionInterface } from '../interfaces/interfaces';
import { RestPageSizeActionInterface } from '../interfaces/interfaces';
import { RestLinksActionInterface } from '../interfaces/interfaces';

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
			return action.pageSize;
		default:
			return state;
	}
}

export const rest_links_reducer = (state = '', action: RestLinksActionInterface): any => {
	switch (action.type) {
		case REST_ACTIONS.SET_REST_LINKS:
			return action.links;
		default:
			return state;
	}
}
