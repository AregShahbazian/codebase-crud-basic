import {normalize} from "normalizr";
import axios from "axios";

export const GET = 'get'
export const POST = 'post'
export const PUT = 'put'
export const PATCH = 'patch'
export const DELETE = 'delete'

const API_ROOT = 'http://localhost:9999/'

axios.defaults.baseURL = API_ROOT;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const callApi = (endpoint, schema, method = GET, id = undefined, data = undefined) => {
    let fullEndpoint = endpoint + (id !== undefined ? `/${id}` : "")
    console.info(`Calling api at ${API_ROOT + fullEndpoint}`)

    return axios({
        method: method,
        url: fullEndpoint,
        data: data
    }).then((response) => (
        {response: normalize(response.data, schema)}
    )).catch((error) => (
        {error: error}
    ))
}
