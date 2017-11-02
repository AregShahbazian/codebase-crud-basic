import undoable, {distinctState} from "redux-undo";
import {FETCH_ALL, SUCCESS} from "../actions";
import * as author from "../actions/domain/author";


const authorsData = (state, action) => {
    switch (action.type) {
        case author.OPERATIONS[FETCH_ALL][SUCCESS]:
            return action.response
        default:
            return state
    }
}

const undoableAuthors = undoable(authorsData, {
    filter: distinctState()
})

export default undoableAuthors
