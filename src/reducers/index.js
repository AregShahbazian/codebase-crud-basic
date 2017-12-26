import merge from "lodash/merge";
import {handleActions} from "redux-actions";

function mergeActionIntoState(state, action) {
    let mergedEntities = merge({}, state, action.payload)
    let mergedResult = [...state.result, action.payload.result]
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
        return mergeActionIntoState(state, action);
    },
    [entityActionCreators.REPLACE.success](state, action) {
        return mergeActionIntoState(state, action);
    },
    [entityActionCreators.UPDATE.success](state, action) {
        return mergeActionIntoState(state, action);
    },
    [entityActionCreators.DELETE.success](state, action) {
        return state
    },
}, {entities: {authors: {}}, result: []});