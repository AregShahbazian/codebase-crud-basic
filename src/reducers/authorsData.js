import undoable, {distinctState} from 'redux-undo'
import * as actions from '../actions'

const authorsData = (state, action) => {
    switch (action.type) {
        case actions.ADD_AUTHOR:
            console.log("inside ADD_AUTHOR")
            console.log(state)
            console.log(action)
            return state
        case actions.AUTHOR[actions.SUCCESS]:
            return action.response
        default:
            return state
    }
}

const undoableAuthors = undoable(authorsData, {
    filter: distinctState()
})

export default undoableAuthors
