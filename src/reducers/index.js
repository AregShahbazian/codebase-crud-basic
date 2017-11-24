import {FETCH_ALL, SUCCESS} from "../actions";

export const entityReducer = (actions) => (state, action) => {
    switch (action.type) {
        case actions.OPERATIONS[FETCH_ALL][SUCCESS]:
            return action.payload
        default:
            return state
    }
}
