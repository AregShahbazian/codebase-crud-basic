import undoable, {distinctState} from 'redux-undo'

const initialAuthors = [
    {id: 1, name: 'Author 1', dateOfBirth: '01-01-1991', numberOfBooks: 11},
    {id: 2, name: 'Author 2', dateOfBirth: '02-02-1992', numberOfBooks: 22}
]
let nextAuthorId = 3;

const authorsData = (state = initialAuthors, action) => {
    switch (action.type) {
        case 'ADD_AUTHOR':
            return [
                ...state,
                {
                    id: nextAuthorId++,
                    name: action.name,
                    dateOfBirth: action.dateOfBirth,
                    numberOfBooks: action.numberOfBooks
                }
            ]
        default:
            return state
    }
}

const undoableAuthors = undoable(authorsData, {
    filter: distinctState()
})

export default undoableAuthors
