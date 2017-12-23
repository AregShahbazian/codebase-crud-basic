import merge from "lodash/merge";
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
        console.info(JSON.stringify(state))
        console.info(JSON.stringify(action.payload))
        console.info(JSON.stringify(merge({}, state, action.payload)))
        console.info(JSON.stringify(merge({}, [{a:1,b:1},{a:2,b:2}], {a:2,b:3})))
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