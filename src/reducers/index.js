import {merge, remove, union} from "lodash";
import {combineActions, handleActions} from "redux-actions";

export const mergeEntityIntoState = (state, entity) => {
    let mergedEntities = merge({}, state, entity)
    let mergedResult = union(state.result, [entity.result])
    return {...mergedEntities, result: mergedResult}
}

export const deleteEntityFromState = (state, entity) => {
    remove(state.result, (n) => (n === entity.result))
    return state
}

export function replaceStateWithEntities(entities) {
    return entities;
}

export const entityReducer = (entityRoutines, initialState) => handleActions({

    [entityRoutines.FETCH_ALL.success]
        (state, action) {
        return replaceStateWithEntities(action.payload)
    },
    [combineActions(
        entityRoutines.FETCH_BY_ID.success,
        entityRoutines.SEARCH.success,
        entityRoutines.CREATE.success,
        entityRoutines.REPLACE.success,
        entityRoutines.UPDATE.success)]
        (state, action) {
        return mergeEntityIntoState(state, action.payload);
    },
    [entityRoutines.DELETE.success]
        (state, action) {
        return deleteEntityFromState(state, action.payload);
    },
}, initialState);