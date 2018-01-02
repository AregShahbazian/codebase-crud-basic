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

function replaceStateWithEntities(entities) {
    return entities;
}
export const entityReducer = (entityActionCreators, initialState) => handleActions({

    [entityActionCreators.FETCH_ALL.success]
        (state, action) {
        console.info(JSON.stringify(initialState))
        return replaceStateWithEntities(action.payload)
    },
    [combineActions(
        entityActionCreators.FETCH_BY_ID.success,
        entityActionCreators.SEARCH.success,
        entityActionCreators.CREATE.success,
        entityActionCreators.REPLACE.success,
        entityActionCreators.UPDATE.success)]
        (state, action) {
        return mergeEntityIntoState(state, action.payload);
    },
    [entityActionCreators.DELETE.success]
        (state, action) {
        return deleteEntityFromState(state, action.payload);
    },
}, initialState);