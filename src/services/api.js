import {normalize, schema} from 'normalizr'
import 'isomorphic-fetch'

export const GET = 'GET'
export const POST = 'POST'
export const PUT = 'PUT'
export const PATCH= 'PATCH'
export const DELETE = 'DELETE'


const API_ROOT = 'http://localhost:9999/'

function callApi(endpoint, schema, method = GET, data) {
    const fullUrl = API_ROOT + endpoint

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

export const addAuthor = (newAuthor) => callApi('author', authorSchema, POST, newAuthor)