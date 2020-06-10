import * as actions from './rest_actions'
import { REST_ACTIONS } from '../references/references';

describe('rest parameters actions', () => {
	describe('set_rest_parameter_attributes_action should create SET action for', () => {
		it('SET filter', () => {
			let attributes = 'attributes';
			expect(actions.set_rest_attributes_action(attributes)).toEqual({
				type: REST_ACTIONS.SET_REST_ATTRIBUTES,
				attributes: attributes
			})
		});
	});
	describe('set_rest_parameter_page_size_action should create SET action for', () => {
		it('SET filter', () => {
			let	pageSize = 25;
			expect(actions.set_rest_page_size_action(pageSize)).toEqual({
				type: REST_ACTIONS.SET_REST_PAGE_SIZE,
				attributes: pageSize
			})
		});
	});
	describe('set_rest_parameter_links_action should create SET action for', () => {
		it('SET filter', () => {
			let links = 'links;';
			expect(actions.set_rest_links_action(links)).toEqual({
				type: REST_ACTIONS.SET_REST_LINKS,
				attributes: links
			})
		});
	});
});
