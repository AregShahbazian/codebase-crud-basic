import {handleActions} from "redux-actions";

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
        return state
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
}, {entities: {data: {}}});