import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import update from "immutability-helper"
import {merge, union} from "lodash";
import {combineActions, handleActions} from "redux-actions";

// NOTE: lodash merge performs recursively, and could slow down performance
export const mergeEntityIntoState = (state, entity) => {
    let entities = merge({}, state.entities, entity.entities)
    let result = union(state.result, [entity.result])

    return {...state, entities, result}
}

export const deleteEntityFromState = (state, entity) => {
    if (state.result.indexOf(entity.result) > -1) {
        return update(state, {result: {$splice: [[state.result.indexOf(entity.result), 1]]}})
    }
    return state
}

export function replaceStateWithEntities(state, entity) {
    return {...state, entities: entity.entities, result: entity.result}
}

export const editEntity = (state, payload) => {
    return update(state, {workspace: {editing: {$set: payload.id}}})
}

export const entityReducers = (entityRoutines, initialState) => handleActions({
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
    [entityRoutines.FORM.edit]
        (state, action) {
        return editEntity(state, action.payload);
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