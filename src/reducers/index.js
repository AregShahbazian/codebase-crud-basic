import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import {createSelector} from 'reselect'
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

export const replaceStateWithEntities = (state, payload) => {
    return {...state, entities: payload.entities, result: payload.result}
}

export const entityCrudReducers = (entityRoutines, initialState) => handleActions({
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


export const prepareEntityForm = (state, payload) => {
    return update(state, {workspace: {$set: payload}})
}

export const clearWorkspace = (state, payload) => {
    return update(state, {workspace: {$set: {}}})
}

const fooFilter = (state) => state

export const entityFormReducers = (entityRoutines) => {
    return (state, action) => {
        switch (action.type) {
            case entityRoutines.CREATE.FULFILL:
                return undefined
            case entityRoutines.UPDATE.FULFILL:
                return undefined
            default:
                return state;
        }
    }
}

export const createDomainReducers = (domainConfigs, domainRoutines) => {
    let entityReducers = domainConfigs.reduce((acc, val) => {
        acc[val.entityName] =
            entityCrudReducers(domainRoutines[val.routineName], val.initialState)
        return acc
    }, {})

    let formPluginReducers = domainConfigs.reduce((acc, val) => {
        acc[val.entityName] =
            entityFormReducers(domainRoutines[val.routineName])
        return acc
    }, {})


    console.info(formPluginReducers)

    return combineReducers({
        ...entityReducers,
        form: formReducer.plugin(formPluginReducers)
    })
}