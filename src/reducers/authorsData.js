import undoable, {distinctState} from 'redux-undo'
import * as actions from '../actions'
import api from '../services'

const authorsData = (state, action) => {
    switch (action.type) {
        case actions.ADD_AUTHOR:
            console.log("inside ADD_AUTHOR")
            console.log(state)
            console.log(action)
            return state
        case actions.AUTHOR_OPERATIONS[api.GET_SUCCESS]:
            return action.response
        default:
            return state
    }
}

const undoableAuthors = undoable(authorsData, {
    filter: distinctState()
})

export default undoableAuthors
