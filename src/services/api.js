import {normalize, schema} from 'normalizr'
import 'isomorphic-fetch'

export const GET = 'GET'
export const POST = 'POST'
export const PUT = 'PUT'
export const PATCH = 'PATCH'
export const DELETE = 'DELETE'


export const GET_REQUEST = 'GET_REQUEST'
export const GET_SUCCESS = 'GET_SUCCESS'
export const GET_FAILURE = 'GET_FAILURE'
export const POST_REQUEST = 'POST_REQUEST'
export const POST_SUCCESS = 'POST_SUCCESS'
export const POST_FAILURE = 'POST_FAILURE'


const API_ROOT = 'http://localhost:9999/'


export function createOperationTypes(entity) {
    return [
        GET_REQUEST,
        GET_SUCCESS,
        GET_FAILURE,
        POST_REQUEST,
        POST_SUCCESS,
        POST_FAILURE
    ].reduce((acc_type, type) => {
        acc_type[`${type}`] = `${entity}_${type}`
        return acc_type
    }, {})

}

function callApi(endpoint, schema, method = GET, id = undefined, data = undefined,) {
    const fullUrl = API_ROOT + endpoint + (id !== undefined ? `/${id}` : "")

    console.log(`Calling api at ${fullUrl}`)

    return fetch(fullUrl, {
        method: method,
        body: data
    })
        .then(response =>
            response.json().then(json => ({json, response}))
        ).then(({json, response}) => {
            if (!response.ok) {
                return Promise.reject(json)
            }

            return normalize(json, schema);
        })
        .then(
            response => ({response}),
            error => ({error: error.message || 'Something bad happened'})
        )
}

const authorSchema = new schema.Entity('authors')
const authorSchemaArray = [authorSchema]

export const fetchAuthors = () => callApi('author', authorSchemaArray)
export const fetchAuthor = (id) => callApi('author', authorSchema, GET, id)
export const addAuthor = (newAuthor) => callApi('author', authorSchema, POST, newAuthor)

