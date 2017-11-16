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
        acc_type[`${type}`] = [
            DO, REQUEST, SUCCESS, FAILURE].reduce((acc, state) => {
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
            do: () => action(ENTITY_OPERATIONS[FETCH_ALL][DO]),
            request: () => action(ENTITY_OPERATIONS[FETCH_ALL][REQUEST]),
            success: (response) => action(ENTITY_OPERATIONS[FETCH_ALL][SUCCESS], response),
            failure: (error) => action(ENTITY_OPERATIONS[FETCH_ALL][FAILURE], error),
        },

        fetchById: {
            do: (id) => action(ENTITY_OPERATIONS[FETCH_BY_ID][DO], {id}),
            request: (id) => action(ENTITY_OPERATIONS[FETCH_BY_ID][REQUEST], {id}),
            success: (response, id) => action(ENTITY_OPERATIONS[FETCH_BY_ID][SUCCESS], {response, id}),
            failure: (error, id) => action(ENTITY_OPERATIONS[FETCH_BY_ID][FAILURE], {error, id}),

        },
        create: {
            do: (data) => action(ENTITY_OPERATIONS[CREATE][DO], data),
            request: (id) => action(ENTITY_OPERATIONS[CREATE][REQUEST], {id}),
            success: (response, id) => action(ENTITY_OPERATIONS[CREATE][SUCCESS], {response, id}),
            failure: (error, id) => action(ENTITY_OPERATIONS[CREATE][FAILURE], {error, id}),

        }
    }
}

/**
 * Generic action creator
 * @param type
 * @param payload
 * @returns {{type: *, payload: {}}}
 */
function action(type, payload = {}) {
    return {type, payload: payload}
}

