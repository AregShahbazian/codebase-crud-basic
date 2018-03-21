import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import update from "immutability-helper"
import {merge, union} from "lodash";
import {combineActions, handleActions} from "redux-actions";

// NOTE: lodash merge performs recursively, and could slow down performance
export const mergeEntityIntoState = (state, payload) => {
    let entities = merge({}, state.entities, payload.entities)
    let result = union(state.result, [payload.result])

    return {...state, entities, result}
}

export const deleteEntityFromState = (state, payload) => {
    if (state.result.indexOf(payload.result) > -1) {
        return update(state, {result: {$splice: [[state.result.indexOf(payload.result), 1]]}})
    }
    return state
}

export function replaceStateWithEntities(state, payload) {
    return {...state, entities: payload.entities, result: payload.result}
}

export const prepareEntityForm = (state, payload) => {
    return update(state, {workspace: {$set: payload}})
}

export function clearWorkspace(state, payload) {
    return update(state, {workspace: {$set: {}}})
}

export const entityReducers = (entityRoutines, initialState) => handleActions({
    /**/
    [entityRoutines.FETCH_ALL.success]
        (state, action) {
        return replaceStateWithEntities(state, action.payload)
    },
    [combineActions(
        entityRoutines.FETCH_BY_ID.success,
        entityRoutines.SEARCH.success,
        entityRoutines.CREATE.success,
        entityRoutines.REPLACE.success,
        entityRoutines.UPDATE.success)]
        (state, action) {
        return mergeEntityIntoState(state, action.payload);
    },
    [entityRoutines.DELETE.success]
        (state, action) {
        return deleteEntityFromState(state, action.payload);
    },
    /**/
    [combineActions(
        entityRoutines.CREATE.fulfill,
        entityRoutines.UPDATE.fulfill)]
        (state, action) {
        return clearWorkspace(state, action.payload);
    },
    /**/
    [entityRoutines.FORM.prepare]
        (state, action) {
        return prepareEntityForm(state, action.payload);
    },
}, initialState);

export const createDomainReducers = (domainConfigs, domainRoutines) => {
    let reducers = domainConfigs.reduce((acc, val) => {
        acc[val.entityName] =
            entityReducers(domainRoutines[val.routineName], val.initialState)
        return acc
    }, {})

    return combineReducers({
        ...reducers,
        form: formReducer
    })
}