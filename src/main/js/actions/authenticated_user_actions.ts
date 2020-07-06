import { AUTHENTICATED_USER_ACTIONS } from '../references/references';
import { AuthenticatedUserActionInterface } from '../references/interfaces';

export const set_user_name_action = (user_name: string): AuthenticatedUserActionInterface => ({
	type: AUTHENTICATED_USER_ACTIONS.SET_USER_NAME,
	user_name: user_name
})
