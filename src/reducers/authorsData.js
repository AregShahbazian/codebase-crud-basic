import undoable, {distinctState} from 'redux-undo'
import * as actions from '../actions'

const initialAuthors = []
let nextAuthorId = 3;

const authorsData = (state = initialAuthors, action) => {
    switch (action.type) {
        case actions.ADD_AUTHOR:
            console.log("inside ADD_AUTHOR")
            console.log(state)
            console.log(action)
            return [
                ...state,
                {
                    id: nextAuthorId++,
                    name: action.name,
                    dateOfBirth: action.dateOfBirth,
                    numberOfBooks: action.numberOfBooks
                }
            ]
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
