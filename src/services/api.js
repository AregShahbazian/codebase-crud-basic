import {normalize, schema} from 'normalizr'
import 'isomorphic-fetch'

export const GET = 'GET'
export const POST = 'POST'
export const PUT = 'PUT'
export const PATCH = 'PATCH'
export const DELETE = 'DELETE'


export const FETCH_ALL = 'FETCH_ALL'
export const FETCH_BY_ID = 'FETCH_BY_ID'
export const CREATE = 'CREATE'

export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

const API_ROOT = 'http://localhost:9999/'

export function createOperationTypes(entity) {
    return [
        FETCH_ALL,
        FETCH_BY_ID,
        CREATE
    ].reduce((acc_type, type) => {
        acc_type[`${type}`] = [
            REQUEST,
            SUCCESS,
            FAILURE
        ].reduce((acc, state) => {
            acc[`${state}`] = `${entity}_${type}_${state}`
            return acc;
        }, {})
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
export const fetchAuthorById = (id) => callApi('author', authorSchema, GET, id)
export const createAuthor = (newAuthor) => callApi('author', authorSchema, POST, newAuthor)

