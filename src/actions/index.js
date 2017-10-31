import api from '../services'

const {FETCH_ALL, FETCH_BY_ID, CREATE, REQUEST, SUCCESS, FAILURE} = api

export const FETCH_AUTHORS = 'FETCH_AUTHORS'
export const FETCH_AUTHOR_BY_ID = 'FETCH_AUTHOR_BY_ID'
export const CREATE_AUTHOR = 'CREATE_AUTHOR'


export const AUTHOR_OPERATIONS = api.createOperationTypes('AUTHOR')

function action(type, payload = {}) {
    return {type, ...payload}
}

/*
 * These are the actions used in the middleware as effects of async operations
 *
 * */
export const author = {
    fetchAll: {
        do: () => action(FETCH_AUTHORS),
        request: () => action(AUTHOR_OPERATIONS[FETCH_ALL][REQUEST], {}),
        success: (response) => action(AUTHOR_OPERATIONS[FETCH_ALL][SUCCESS], {response}),
        failure: (error) => action(AUTHOR_OPERATIONS[FETCH_ALL][FAILURE], {error}),
    },

    fetchById: {
        do: (id) => action(FETCH_AUTHOR_BY_ID, {id}),
        request: (id) => action(AUTHOR_OPERATIONS[FETCH_BY_ID][REQUEST], {id}),
        success: (response, id) => action(AUTHOR_OPERATIONS[FETCH_BY_ID][SUCCESS], {response, id}),
        failure: (error, id) => action(AUTHOR_OPERATIONS[FETCH_BY_ID][FAILURE], {error, id}),

    },
    create: {
        do: (data) => action(CREATE_AUTHOR, {data}),
        request: (id) => action(AUTHOR_OPERATIONS[CREATE][REQUEST], {id}),
        success: (response, id) => action(AUTHOR_OPERATIONS[CREATE][SUCCESS], {response, id}),
        failure: (error, id) => action(AUTHOR_OPERATIONS[CREATE][FAILURE], {error, id}),

    }
}


