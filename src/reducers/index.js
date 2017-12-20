import {handleActions} from "redux-actions";

export const entityReducer = (entityActionCreators) => handleActions({
    [entityActionCreators.fetchAll.success](state, action) {
        return action.payload
    }
}, {entities: {data: {}}});