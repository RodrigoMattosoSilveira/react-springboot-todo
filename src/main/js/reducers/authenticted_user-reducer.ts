import { AUTHENTICATED_USER_ACTIONS } from '../references/references';
import { AuthenticatedUserActionInterface } from '../interfaces/interfaces';

export const authenticated_user_reducer = (state = '', action: AuthenticatedUserActionInterface): string => {
    switch (action.type) {
        case AUTHENTICATED_USER_ACTIONS.SET_USER_NAME:
            return action.user_name;
        default:
            return state;
    }
}
