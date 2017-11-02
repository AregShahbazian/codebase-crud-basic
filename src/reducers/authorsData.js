import undoable, {distinctState} from 'redux-undo'
import * as actions from '../actions'
import * as author from '../actions/domain/author'
import api from '../services'

const {FETCH_ALL, FETCH_BY_ID, UPDATE, REQUEST, SUCCESS, FAILURE} = actions

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
