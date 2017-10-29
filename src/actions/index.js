import api from '../services'

export const FETCH_AUTHORS = 'FETCH_AUTHORS'
export const FETCH_AUTHOR = 'FETCH_AUTHOR'
export const ADD_AUTHOR = 'ADD_AUTHOR'


export const AUTHOR_OPERATIONS = api.createOperationTypes('AUTHOR')
console.log(AUTHOR_OPERATIONS)


function action(type, payload = {}) {
    return {type, ...payload}
}


/* Action definitions
*  Interface to the actions of each entity
* */

export const author = {
    getAll: {
        request: () => action(AUTHOR_OPERATIONS[api.GET_REQUEST], {}),
        success: (response) => action(AUTHOR_OPERATIONS[api.GET_SUCCESS], {response}),
        failure: (error) => action(AUTHOR_OPERATIONS[api.GET_FAILURE], {error}),
    },

    getById: {
        request: (id) => action(AUTHOR_OPERATIONS[api.GET_REQUEST], {id}),
        success: (response, id) => action(AUTHOR_OPERATIONS[api.GET_SUCCESS], {response, id}),
        failure: (error, id) => action(AUTHOR_OPERATIONS[api.GET_FAILURE], {error, id}),

    },
    create: {
        request: (id) => action(AUTHOR_OPERATIONS[api.POST_REQUEST], {id}),
        success: (response, id) => action(AUTHOR_OPERATIONS[api.POST_SUCCESS], {response, id}),
        failure: (error, id) => action(AUTHOR_OPERATIONS[api.POST_FAILURE], {error, id}),

    }
}


export const fetchAuthors = () => action(FETCH_AUTHORS)
export const fetchAuthor = (id) => action(FETCH_AUTHOR, {id})
export const addAuthor = (data) => action(ADD_AUTHOR, {data})

