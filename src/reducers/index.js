import {handleActions} from "redux-actions";

export const entityReducer = (entityActionCreators) => handleActions({
    [entityActionCreators.FETCH_ALL.success](state, action) {
        return action.payload
    }
}, {entities: {data: {}}});