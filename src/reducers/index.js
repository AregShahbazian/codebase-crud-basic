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
    return {entities: payload.entities, result: payload.result}
}

/**
 * Reducers for entity-state
 * @param entityRoutines
 * @param initialState
 */
export const entityCrudReducers = (entityRoutines, initialState) => handleActions({
    /**/
    [combineActions(
        entityRoutines.FILTER.success)]
        (state, action) {
        return replaceStateWithEntities(state, action.payload)
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
export const entityFilterFormReducers = (entityRoutines) => handleActions({
}, {})


/**
 * Reducers for create form state
 * @param entityRoutines
 */
export const entityCreateFormReducers = (entityRoutines) => handleActions({
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
export const entityUpdateFormReducers = (entityRoutines) => handleActions({
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
    let entityReducers = reduce(domainConfigs, (acc, val, key) => {
        acc[key] =
            entityCrudReducers(domainRoutines[val.routineName], val.initialState)
        return acc
    }, {})

    let formPluginReducers = reduce(domainConfigs, (acc, val, key) => {
        acc[`${key}-filter`] = entityFilterFormReducers(domainRoutines[val.routineName])
        acc[`${key}-create`] = entityCreateFormReducers(domainRoutines[val.routineName])
        acc[`${key}-update`] = entityUpdateFormReducers(domainRoutines[val.routineName])
        return acc
    }, {})

    return combineReducers({
        ...entityReducers,
        form: formReducer.plugin(formPluginReducers)
    })
}