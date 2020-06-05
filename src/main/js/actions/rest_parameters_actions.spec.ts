import * as actions from './rest_parameters_actions'
import { REST_PARAMETERS_ACTIONS } from '../references/references';

describe('rest parameters actions', () => {
	describe('set_rest_parameter_attributes_action should create SET action for', () => {
		it('SET filter', () => {
			let attributes = 'attributes';
			expect(actions.set_rest_parameter_attributes_action(attributes)).toEqual({
				type: REST_PARAMETERS_ACTIONS.SET_REST_PARAMETER_ATTRIBUTES,
				attributes: attributes
			})
		});
	});
	describe('set_rest_parameter_page_size_action should create SET action for', () => {
		it('SET filter', () => {
			let	pageSize = 25;
			expect(actions.set_rest_parameter_page_size_action(pageSize)).toEqual({
				type: REST_PARAMETERS_ACTIONS.SET_REST_PARAMETER_PAGE_SIZE,
				attributes: pageSize
			})
		});
	});
	describe('set_rest_parameter_links_action should create SET action for', () => {
		it('SET filter', () => {
			let links = 'links;';
			expect(actions.set_rest_parameter_links_action(links)).toEqual({
				type: REST_PARAMETERS_ACTIONS.SET_REST_PARAMETER_LINKS,
				attributes: links
			})
		});
	});
});
