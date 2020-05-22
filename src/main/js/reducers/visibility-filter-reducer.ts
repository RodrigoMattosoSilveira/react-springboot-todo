import { VISIBILITY_FILTER_ACTIONS, VISIBILITY_FILTER_TYPES } from '../references/references';
import { VisibilityFilterActionInterface } from '../interfaces/interfaces';

export const visibility_filter_reducer = (state = VISIBILITY_FILTER_TYPES.ALL, action: VisibilityFilterActionInterface): string => {
    switch (action.type) {
        case VISIBILITY_FILTER_ACTIONS.SET:
            return action.filter;
        default:
            return state;
    }
}
