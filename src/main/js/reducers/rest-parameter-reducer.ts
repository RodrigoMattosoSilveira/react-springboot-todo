import { REST_PARAMETERS_ACTIONS } from '../references/references';
import { RestParameterAttributesActionInterface } from '../interfaces/interfaces';
import { RestParameterPageSizeActionInterface } from '../interfaces/interfaces';
import { RestParameterLinksActionInterface } from '../interfaces/interfaces';

export const rest_parameter_attributes_reducer = (state = '', action: RestParameterAttributesActionInterface): any => {
    switch (action.type) {
        case REST_PARAMETERS_ACTIONS.SET_REST_PARAMETER_ATTRIBUTES_ACTIONS:
            return action.attributes;
        default:
            return state;
    }
}

export const rest_parameter_page_size_reducer = (state = 3, action: RestParameterPageSizeActionInterface): number => {
	switch (action.type) {
		case REST_PARAMETERS_ACTIONS.SET_REST_PARAMETER_PAGE_SIZE_ACTIONS:
			return action.pageSize;
		default:
			return state;
	}
}

export const rest_parameter_links_reducer = (state = '', action: RestParameterLinksActionInterface): any => {
	switch (action.type) {
		case REST_PARAMETERS_ACTIONS.SET_REST_PARAMETER_ATTRIBUTES_ACTIONS:
			return action.links;
		default:
			return state;
	}
}
