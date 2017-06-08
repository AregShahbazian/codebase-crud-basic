import undoable, { distinctState } from 'redux-undo'

const initialAuthors = [{id: 1, name: 'Author 1'}, {id: 2, name: 'Author 2'}]
let nextAuthorId = 3;

const authors = (state = initialAuthors, action) => {
    switch (action.type) {
        case 'ADD_AUTHOR':
            return [
                ...state,
                {
                    id: nextAuthorId++,
                    name: action.name
                }
            ]
        default:
            return state
    }
}

const undoableAuthors = undoable(authors, {
    filter: distinctState()
})

export default undoableAuthors
