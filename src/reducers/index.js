import {merge, union} from "lodash";
import {handleActions} from "redux-actions";

export const mergeEntityIntoState = (state, entity) => {
    let mergedEntities = merge({}, state, entity)
    let mergedResult = union(state.result, [entity.result])
    return {...mergedEntities, result: mergedResult}
}

export const replaceEntityInState = (state, entity) => {
    let mergedEntities = merge({}, state, entity)
    let mergedResult = [...state.result, entity.result]
    return {...mergedEntities, result: mergedResult}
}

export const entityReducer = (entityActionCreators) => handleActions({
    [entityActionCreators.FETCH_ALL.success](state, action) {
        return action.payload
    },
    [entityActionCreators.FETCH_BY_ID.success](state, action) {
        return action.payload
    },
    [entityActionCreators.SEARCH.success](state, action) {
        return action.payload
    },
    [entityActionCreators.CREATE.success](state, action) {
        return mergeEntityIntoState(state, action.payload);
    },
    [entityActionCreators.REPLACE.success](state, action) {
        return state
    },
    [entityActionCreators.UPDATE.success](state, action) {
        return state
    },
    [entityActionCreators.DELETE.success](state, action) {
        return state
    },
}, {entities: {authors: {}}, result: []});