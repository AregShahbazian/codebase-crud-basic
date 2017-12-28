import {normalize} from "normalizr";
import axios from "axios";
import $ from "jquery";

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
 * Construct a request object containing the full endpoint and the request body
 * @param endpoint
 * @param method
 * @param payload
 * @param id
 * @returns {{fullEndpoint: string, requestBody: *}}
 */
export const createRequest = (endpoint, method, payload, id) => {
    let idUriParameter = ""

    if (method !== POST && id) {
        idUriParameter = `/${id}`
    }

    let queryParameters = "";
    let requestBody

    if (method === GET || method === DELETE) {
        queryParameters = !$.isEmptyObject(payload) ? "?" + $.param(payload) : queryParameters
        requestBody = undefined
    } else {
        requestBody = payload
    }

    return {fullEndpoint: endpoint + idUriParameter + queryParameters, requestBody: requestBody}
}

/**
 * Perform the actual request
 * @param method
 * @param request
 * @param schema
 */
const makeRequest = (method, request, schema) =>
    axios({
        method: method,
        url: request.fullEndpoint,
        data: request.requestBody
    }).then((response) => (
        {response: normalizeData(schema, response.data)}
    )).catch((error) => (
        {error: error}
    ))

/**
 * Normalize given data using given schema
 * @param schema
 * @param data
 * @returns {{entities: any, result: any}}
 */
export const normalizeData = (schema, data) => {
    return normalize(data, schema)
}

/**
 * Generic function for calling an api at given endpoint, with given method, using given payload as data (or adding the
 * id in the meta object to the endpoint). Returns the data normalized using the given schema
 * @param endpoint
 * @param schema
 * @param method
 * @param payload
 * @param meta
 * @returns {Promise.<T>|*}
 */
export const callApi = (endpoint = '', schema, method = GET, payload = {}, meta = {}) => {
    let request = createRequest(endpoint, method, payload, meta.id)
    console.log(`Calling api at ${API_ROOT + request.fullEndpoint} with method %s and payload %s`, method, JSON.stringify(request.requestBody))
    return makeRequest(method, request, schema)
}
