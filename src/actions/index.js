import {createActions} from "redux-actions";

export const FETCH_ALL = 'FETCH_ALL'
export const FETCH_BY_ID = 'FETCH_BY_ID'
export const CREATE = 'CREATE'

export const DO = 'DO'
export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'


/**
 * The CRUD action creators for each entity name
 * */
export const entityActionCreators = (entityNames) => {
    return createActions(entityNames.reduce((acc, val) => {
        acc[val] = {
            FETCH_ALL: {
                DO: undefined,
                REQUEST: undefined,
                SUCCESS: undefined,
                FAILURE: undefined,
            },
            FETCH_BY_ID: {
                DO: undefined,
                REQUEST: undefined,
                SUCCESS: undefined,
                FAILURE: undefined,
            },
            CREATE: {
                DO: undefined,
                REQUEST: undefined,
                SUCCESS: undefined,
                FAILURE: undefined,
            }
        }
        return acc
    }, {}))
}

