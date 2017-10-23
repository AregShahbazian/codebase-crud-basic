export const ADD_AUTHOR = 'ADD_AUTHOR'
export const FETCH_AUTHORS = 'FETCH_AUTHORS'

function action(type, payload = {}) {
    return {type, ...payload}
}

export const addAuthor = (name, dateOfBirth, numberOfBooks) => action(ADD_AUTHOR, {name, dateOfBirth, numberOfBooks})
export const fetchAuthors = () => action(FETCH_AUTHORS)

