import {normalize, schema} from 'normalizr'
import 'isomorphic-fetch'
import axios from 'axios'

export const GET = 'get'
export const POST = 'post'
export const PUT = 'put'
export const PATCH = 'patch'
export const DELETE = 'delete'

const API_ROOT = 'http://localhost:9999/'

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

// TODO: handle error returning (and what happens in saga)
export const bar = (endpoint, schema, method = GET, id = undefined, data = undefined) => {
    let fullEndpoint = endpoint + (id !== undefined ? `/${id}` : "")
    console.info(`Calling api at ${API_ROOT + fullEndpoint}`)

    return axios({
        method: method,
        url: fullEndpoint,
        data: data
    }).then((response) => {
        console.log(" yaaay axios")
        console.log(normalize(response.data, schema));

    }).catch((error) => {
        console.log(" booo axios")
        console.error(error);
    })
}


const authorSchema = new schema.Entity('authors')
const authorSchemaArray = [authorSchema]

export const fetchAuthors = () => callApi('author', authorSchemaArray)
export const fetchAuthorById = (id) => callApi('author', authorSchema, GET, id)
export const createAuthor = (newAuthor) => callApi('author', authorSchema, POST, newAuthor)


axios.defaults.baseURL = API_ROOT;

export const foo = () => bar('author', authorSchema, GET, 3)