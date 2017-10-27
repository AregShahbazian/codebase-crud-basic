import {normalize, schema} from 'normalizr'
import 'isomorphic-fetch'

const API_ROOT = 'http://localhost:9999/'

function callApi(endpoint, schema) {
    const fullUrl = API_ROOT + endpoint

    console.log(`Calling api at ${fullUrl}`)

    return fetch(fullUrl)
        .then(response =>
            response.json().then(json => ({json, response}))
        ).then(({json, response}) => {
            if (!response.ok) {
                return Promise.reject(json)
            }

            /*return Object.assign({},
                normalize(json, schema)
            )*/
            return json;
        })
        .then(
            response => ({response}),
            error => ({error: error.message || 'Something bad happened'})
        )
}

const authorSchema = new schema.Entity('authors')
const authorSchemaArray = new schema.Array(authorSchema)

export const fetchAuthors = () => callApi('author', authorSchemaArray)
