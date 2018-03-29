import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import update from "immutability-helper"
import {merge, union, reduce} from "lodash";
import {combineActions, handleActions} from "redux-actions";

// NOTE: lodash merge performs recursively, and could slow down performance
/**
 * Performs immutable merge of a single normalized entity with the state
 * @param state
 * @param payload
 * @returns {*}
 */
export const mergeEntityIntoState = (state, payload) => {
    let entities = merge({}, state.entities, payload.entities)
    let result = union(state.result, [payload.result])

    return {...state, entities, result}
}

/**
 * Performs immutable delete, removing the the id in the payload from the result array in the state
 * @param state
 * @param payload
 * @returns {*}
 */
export const deleteEntityFromState = (state, payload) => {
    let idx = state.result.indexOf(payload.result)
    if (idx > -1) {
        return update(state, {result: {$splice: [[idx, 1]]}})
    }
    return state
}

/**
 * Immutably replaces the entities- and result-keys in the state with those in the payload
 * @param state
 * @param payload
 * @returns {{entities, result}}
 */
export const replaceStateWithEntities = (state, payload) => {
    return {...state, entities: payload.entities, result: payload.result}
}

export const updateTableState = (state, loading) => {
    return {...state, loading: loading}
}

/**
 * Reducers for entity-state
 * @param entityRoutines
 * @param initialState
 */
export const createEntityDataReducers = (entityRoutines, initialState) => handleActions({
    /* REQUEST */
    [combineActions(
        entityRoutines.FILTER.request)]
        (state, action) {
        return updateTableState(state, true)
    },
    /* SUCCESS */
    [combineActions(
        entityRoutines.FILTER.success)]
        (state, action) {
        return updateTableState(replaceStateWithEntities(state, action.payload), false)
    },
    [combineActions(
        entityRoutines.FETCH_BY_ID.success,
        entityRoutines.CREATE.success,
        entityRoutines.REPLACE.success,
        entityRoutines.UPDATE.success)]
        (state, action) {
        return mergeEntityIntoState(state, action.payload);
    },
    [entityRoutines.DELETE.success]
        (state, action) {
        return deleteEntityFromState(state, action.payload);
    }
}, initialState);

/**
 * Immutably replaces the values-key in the state with the payload
 * @param state
 * @param payload
 * @returns {*}
 */
export const prepareEntityForm = (state, payload) => {
    return update(state, {values: {$set: payload}})
}

/**
 * Reducers for create form state
 * @param entityRoutines
 */
export const createEntityFilterFormReducers = (entityRoutines) => handleActions({}, {})


/**
 * Reducers for create form state
 * @param entityRoutines
 */
export const createEntityCreateFormReducers = (entityRoutines) => handleActions({
    [combineActions(
        entityRoutines.CREATE.SUCCESS)]
        (state, action) {
        return {};
    },
    [entityRoutines.FORM.prepareCreate]
        (state, action) {
        return prepareEntityForm(state, {});
    }
}, {})

/**
 * Reducers for update form state
 * @param entityRoutines
 */
export const createEntityUpdateFormReducers = (entityRoutines) => handleActions({
    [combineActions(
        entityRoutines.UPDATE.SUCCESS)]
        (state, action) {
        return {};
    },
    [entityRoutines.FORM.prepareUpdate]
        (state, action) {
        return prepareEntityForm(state, action.payload);
    }
}, {})

/**
 * Creates crud-reducers, create-form reducers, and update-form reducers, for each entity in domainConfigs.
 * @param domainConfigs
 * @param domainRoutines
 * @returns {Reducer<any>}
 */
export const createDomainReducers = (domainConfigs, domainRoutines) => {
    let entityDataReducers = reduce(domainConfigs, (reducers, entityConfig, entityName) => {
        reducers[entityName] =
            createEntityDataReducers(domainRoutines[entityConfig.routineName], entityConfig.initialState)
        return reducers
    }, {})

    let formPluginReducers = reduce(domainConfigs, (reducers, entityConfig, entityName) => {
        reducers[`${entityName}-filter`] = createEntityFilterFormReducers(domainRoutines[entityConfig.routineName])
        reducers[`${entityName}-create`] = createEntityCreateFormReducers(domainRoutines[entityConfig.routineName])
        reducers[`${entityName}-update`] = createEntityUpdateFormReducers(domainRoutines[entityConfig.routineName])
        return reducers
    }, {})

    return combineReducers({
        ...entityDataReducers,
        form: formReducer.plugin(formPluginReducers)
    })
}