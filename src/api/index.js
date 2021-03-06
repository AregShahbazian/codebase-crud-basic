import config from "../config/index";
import {normalize, schema} from "normalizr";
import axios from "axios";
import {reduce} from "lodash";
import qs from "qs"

export const GET = 'get'
export const POST = 'post'
export const PUT = 'put'
export const PATCH = 'patch'
export const DELETE = 'delete'

const API_ROOT = config.apiRoot;

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
        queryParameters += Object.keys(payload).length ? "?" + qs.stringify(payload) : "";
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
const callApi = (endpoint = '', schema, method = GET, payload = {}, meta = {}) => {
    let request = createRequest(endpoint, method, payload, meta.id)
    console.log(`Calling api at ${API_ROOT}/${request.fullEndpoint} with method ${method} and payload ${JSON.stringify(request.requestBody)}`)
    return makeRequest(method, request, schema)
}

/**
 * For each entityConfig object in domainConfigs an object with api-functions is created,
 * containing api-functions for all routines
 * @param domainConfigs
 * @returns {{}|any|any}
 */
export const createDomainApiFunctions = (domainConfigs) => {
    return reduce(domainConfigs, (apiFunctions, entityConfig, entityName) => {
        apiFunctions[entityName] = {
            fetchById: callApi.bind(null, entityConfig.endpoint, entityConfig.schema, GET),
            filter: callApi.bind(null, entityConfig.endpoint, new schema.Array(entityConfig.schema), GET),
            create: callApi.bind(null, entityConfig.endpoint, entityConfig.schema, POST),
            replace: callApi.bind(null, entityConfig.endpoint, entityConfig.schema, PUT),
            update: callApi.bind(null, entityConfig.endpoint, entityConfig.schema, PATCH),
            delete: callApi.bind(null, entityConfig.endpoint, entityConfig.schema, DELETE)
        }
        return apiFunctions
    }, {})
}



