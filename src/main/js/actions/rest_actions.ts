import { REST_ACTIONS } from '../references/references';
import { RestAttributesActionInterface } from '../interfaces/interfaces';
import { RestPageSizeActionInterface } from '../interfaces/interfaces';
import { RestLinksActionInterface } from '../interfaces/interfaces';

export const set_rest_attributes_action = (attributes: any): RestAttributesActionInterface => ({
	type: REST_ACTIONS.SET_REST_ATTRIBUTES,
	attributes: attributes,
})

export const set_rest_page_size_action = (pageSize: number): RestPageSizeActionInterface => ({
	type: REST_ACTIONS.SET_REST_PAGE_SIZE,
	pageSize: pageSize,
})

export const set_rest_links_action = (links: any): RestLinksActionInterface => ({
	type: REST_ACTIONS.SET_REST_LINKS,
	links: links
})
