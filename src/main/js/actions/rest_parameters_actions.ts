import { REST_PARAMETERS_ACTIONS } from '../references/references';
import { RestParameterAttributesActionInterface } from '../interfaces/interfaces';
import { RestParameterPageSizeActionInterface } from '../interfaces/interfaces';
import { RestParameterLinksActionInterface } from '../interfaces/interfaces';

export const set_rest_parameter_attributes_action = (attributes: any): RestParameterAttributesActionInterface => ({
	type: REST_PARAMETERS_ACTIONS.SET_REST_PARAMETER_ATTRIBUTES,
	attributes: attributes,
})

export const set_rest_parameter_page_size_action = (pageSize: number): RestParameterPageSizeActionInterface => ({
	type: REST_PARAMETERS_ACTIONS.SET_REST_PARAMETER_PAGE_SIZE,
	pageSize: pageSize,
})

export const set_rest_parameter_links_action = (links: any): RestParameterLinksActionInterface => ({
	type: REST_PARAMETERS_ACTIONS.SET_REST_PARAMETER_LINKS,
	links: links
})
