
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
    return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
        acc[type] = `${base}_${type}`
        return acc
    }, {})
}

export const AUTHOR = createRequestTypes('AUTHOR')

export const ADD_AUTHOR = 'ADD_AUTHOR'
export const LOAD_AUTHORS = 'LOAD_AUTHORS'


function action(type, payload = {}) {
    return {type, ...payload}
}

export const author = {
    request: () => action(AUTHOR[REQUEST], {}),
    success: (response) => action(AUTHOR[SUCCESS], {response}),
    failure: (error) => action(AUTHOR[FAILURE], {error}),
}

export const addAuthor = (name, dateOfBirth, numberOfBooks) => action(ADD_AUTHOR, {name, dateOfBirth, numberOfBooks})
export const fetchAuthors = () => action(LOAD_AUTHORS)

