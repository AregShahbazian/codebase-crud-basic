import {normalize} from "normalizr";
import axios from "axios";
import $ from "jquery"

export const GET = 'get'
export const POST = 'post'
export const PUT = 'put'
export const PATCH = 'patch'
export const DELETE = 'delete'

const API_ROOT = 'http://localhost:9999/'

axios.defaults.baseURL = API_ROOT;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * Generic function for calling an api at given endpoint, with given method, using given payload as data (or adding the
 * id in th epayload to the endpoint). Returns the data normalized using the given schema
 * @param endpoint
 * @param schema
 * @param method
 * @param payload
 * @param meta
 * @returns {Promise.<T>|*}
 */
export const callApi = (endpoint = '', schema, method = GET, payload = {}, meta = {}) => {
    let idUriParameter = meta.id !== undefined ? `/${meta.id}` : ""
    let queryParameters = "";

    if (method === GET || method === DELETE) {
        queryParameters = payload!=={} ? "?" + $.param(payload) : queryParameters
        payload = undefined
    } else {
    }

    let fullEndpoint = endpoint + idUriParameter + queryParameters
    console.log(`Calling api at ${API_ROOT + fullEndpoint} with method %s and payload %s`, method, JSON.stringify(payload))


    return axios({
        method: method,
        url: fullEndpoint,
        data: payload
    }).then((response) => (
        {response: normalize(response.data, schema)}
    )).catch((error) => (
        {error: error}
    ))
}
