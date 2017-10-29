import api from '../services'

const {GET, POST, PUT, PATCH, DELETE} = api

export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

export const ADD_AUTHOR = 'ADD_AUTHOR'
export const FETCH_AUTHORS = 'FETCH_AUTHORS'

export const AUTHOR = createRequestTypes('AUTHOR')


function action(type, payload = {}) {
    return {type, ...payload}
}

function createRequestTypes(base) {
    return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
        acc[type] = `${base}_${type}`
        return acc
    }, {})
}


function createRequestTypes2(entity) {
    return [REQUEST, SUCCESS, FAILURE].reduce((acc_type, type) => {

        return [GET, POST, PUT, PATCH, DELETE].reduce((acc_method, method) => {
            acc_type[type] = `${entity}_${method}_${type}`
            return acc_type
        })
    }, {})


    /* return [REQUEST, SUCCESS, FAILURE].reduce((acc_method, type) => {
         acc_method[type] = `${method}_${type}`
         return acc_method
     }, {})*/
}

console.log(createRequestTypes2('AUTHOR'))

/* Interface to the actions of each entity */

export const author = {
    request: () => action(AUTHOR[REQUEST], {}),
    success: (response) => action(AUTHOR[SUCCESS], {response}),
    failure: (error) => action(AUTHOR[FAILURE], {error}),
}


export const addAuthor = (payload) => action(ADD_AUTHOR, payload)
export const fetchAuthors = () => action(FETCH_AUTHORS)

