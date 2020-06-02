import * as actions from './authenticated_user_actions'
import { AUTHENTICATED_USER_ACTIONS } from '../references/references';

describe('authenticated user actions', () => {
	describe('set_authenticated_user_action should create SET action for', () => {
		it('SET filter', () => {
			let user_name = 'Floyd';
			expect(actions.set_user_name_action(user_name)).toEqual({
				type: AUTHENTICATED_USER_ACTIONS.SET_USER_NAME,
				user_name: user_name
			})
		});
	});
});
