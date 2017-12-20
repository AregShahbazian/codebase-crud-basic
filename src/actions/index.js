import {createAction, createActions} from "redux-actions";

export const FETCH_ALL = 'FETCH_ALL'
export const FETCH_BY_ID = 'FETCH_BY_ID'
export const CREATE = 'CREATE'

export const DO = 'DO'
export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

/**
 * Creates tree of operation types for the given entity name
 * @param entityName
 * @returns {*}
 */
export const createOperationTypes = (entityName) => {
    return [FETCH_ALL, FETCH_BY_ID, CREATE].reduce((acc_type, type) => {
        acc_type[`${type}`] = [DO, REQUEST, SUCCESS, FAILURE].reduce((acc, state) => {
            acc[`${state}`] = `${entityName}_${type}_${state}`
            return acc;
        }, {})
        return acc_type
    }, {})
}


/**
 * These are the CRUD actions for each entity
 * */
export const entityActions = (ENTITY_OPERATIONS) => {
    return {
        fetchAll: {
            do: createAction(ENTITY_OPERATIONS[FETCH_ALL][DO]),
            request: createAction(ENTITY_OPERATIONS[FETCH_ALL][REQUEST]),
            success: createAction(ENTITY_OPERATIONS[FETCH_ALL][SUCCESS]),
            failure: createAction(ENTITY_OPERATIONS[FETCH_ALL][FAILURE]),
        },

        fetchById: {
            do: createAction(ENTITY_OPERATIONS[FETCH_BY_ID][DO]),
            request: createAction(ENTITY_OPERATIONS[FETCH_BY_ID][REQUEST]),
            success: createAction(ENTITY_OPERATIONS[FETCH_BY_ID][SUCCESS]),
            failure: createAction(ENTITY_OPERATIONS[FETCH_BY_ID][FAILURE]),

        },
        create: {
            do: createAction(ENTITY_OPERATIONS[CREATE][DO]),
            request: createAction(ENTITY_OPERATIONS[CREATE][REQUEST]),
            success: createAction(ENTITY_OPERATIONS[CREATE][SUCCESS]),
            failure: createAction(ENTITY_OPERATIONS[CREATE][FAILURE]),

        }
    }
}

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

