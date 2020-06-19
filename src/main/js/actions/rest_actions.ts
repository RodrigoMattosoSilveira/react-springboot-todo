import { REST_ACTIONS } from '../references/references';
import { RestAttributesActionInterface } from '../interfaces/interfaces';
import { RestPageSizeActionInterface } from '../interfaces/interfaces';
import { RestLinksActionInterface } from '../interfaces/interfaces';
import {store} from "../services/store";
import {loadFromServer} from "../services/load-from-server";

export const set_rest_attributes_action = (attributes: any): RestAttributesActionInterface => ({
	type: REST_ACTIONS.SET_REST_ATTRIBUTES,
	attributes: attributes,
})

export const set_rest_page_size_action_thunk = (pageSize: number) =>
	(dispatch: any, getState: any) => {// thunk, also receives `axios` dep.
	console.log('set_rest_page_size_action_thunk: ' + pageSize)
		dispatch(set_rest_page_size_action(pageSize));
		loadFromServer(pageSize, dispatch);
	}

export const set_rest_page_size_action = (pageSize: number): RestPageSizeActionInterface => ({
	type: REST_ACTIONS.SET_REST_PAGE_SIZE,
	pageSize: pageSize,
})

export const set_rest_links_action = (links: any): RestLinksActionInterface => ({
	type: REST_ACTIONS.SET_REST_LINKS,
	links: links
})


