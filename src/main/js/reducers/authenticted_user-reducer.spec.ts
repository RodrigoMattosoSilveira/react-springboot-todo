import { VISIBILITY_FILTER_TYPES } from '../references/references'
import { AUTHENTICATED_USER_ACTIONS } from '../references/references'
import { authenticated_user_reducer }  from './authenticted_user-reducer';
import { AuthenticatedUserActionInterface } from '../interfaces/interfaces';

describe('authenticated user reducers', () => {
	it('should handle initial state', () => {
		const setAuthenticatedUserNameAction: AuthenticatedUserActionInterface = {type:  'INVALID', user_name: 'ignore'}
		expect(authenticated_user_reducer(undefined, setAuthenticatedUserNameAction)).toEqual('')
	})
	it('should handle SET_USER_NAME', () => {
		let userName = 'Floyd';
		const actionType = AUTHENTICATED_USER_ACTIONS.SET_USER_NAME;
		const actionUserName = 'Floyd';
		const action = {type:  actionType, user_name: userName}
		const state = authenticated_user_reducer(userName, action);
		expect(state).toEqual(userName);
	});
});
