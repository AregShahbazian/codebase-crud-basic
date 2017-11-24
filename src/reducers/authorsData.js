import undoable, {distinctState} from "redux-undo";
import {FETCH_ALL, SUCCESS} from "../actions";
import {actions} from "../actions/domain";


const authorsData = (state, action) => {
    switch (action.type) {
        case actions.author.OPERATIONS[FETCH_ALL][SUCCESS]:
            return action.payload
        default:
            return state
    }
}

const undoableAuthors = undoable(authorsData, {
    filter: distinctState()
})

export default undoableAuthors
