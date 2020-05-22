import { VISIBILITY_FILTER_TYPES } from '../references/references'
import { VISIBILITY_FILTER_ACTIONS } from '../references/references'
import { visibility_filter_reducer }  from './visibility-filter-reducer';
import { VisibilityFilterActionInterface } from '../interfaces/interfaces';

describe('visibility-filter-reducers', () => {
    it('should handle initial state', () => {
        const visibilityFilterAction: VisibilityFilterActionInterface = {type:  'INVALID', filter: 'ignore'}
        expect(visibility_filter_reducer(undefined, visibilityFilterAction)).toEqual(VISIBILITY_FILTER_TYPES.ALL)
    })
    it('should handle DONE', () => {
        const actionType = VISIBILITY_FILTER_ACTIONS.SET;
        const actionFilter = VISIBILITY_FILTER_TYPES.DONE;
        const action = {type:  actionType, filter: actionFilter}
        const state = visibility_filter_reducer(VISIBILITY_FILTER_TYPES.ALL, action);
        expect(state).toEqual(VISIBILITY_FILTER_TYPES.DONE);
    });
    it('should handle OPEN', () => {
        const actionType = VISIBILITY_FILTER_ACTIONS.SET;
        const actionFilter = VISIBILITY_FILTER_TYPES.OPEN;
        const action = {type:  actionType, filter: actionFilter}
        const state = visibility_filter_reducer(VISIBILITY_FILTER_TYPES.ALL, action);
        expect(state).toEqual(VISIBILITY_FILTER_TYPES.OPEN);
    });
    it('should handle ALL', () => {
        const actionType = VISIBILITY_FILTER_ACTIONS.SET;
        const actionFilter = VISIBILITY_FILTER_TYPES.ALL;
        const action = {type:  actionType, filter: actionFilter}
        const state = visibility_filter_reducer(VISIBILITY_FILTER_TYPES.OPEN, action);
        expect(state).toEqual(VISIBILITY_FILTER_TYPES.ALL);
    });
});
