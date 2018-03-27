import {map, reduce} from "lodash";
import {all, call, fork, put, takeLatest} from "redux-saga/effects";

/******************************* SUBROUTINES *************************************/

/**
 * Performs an asynchronous entity operation and dispatches corresponding actions
 * @param entityOp bundle of actions that correspond to an asynchronous entity operation
 * @param apiFn actual api function
 * @param action action that triggered the asynchronous entity operation
 */
export function* makeApiCall(entityOp, apiFn, action) {
    console.log("Making api call for action: %s", action.type);

    console.log("put : entity operation request")
    yield put(entityOp.request())

    console.log("call : api function")
    const {response, error} = yield call(apiFn, action.payload, action.meta)

    if (response) {
        // console.log("put : entity operation success\n normalized response: %s", JSON.stringify(response))
        yield put(entityOp.success(response))
    }
    else {
        console.log("put : entity operation failure")
        console.error(error)
        yield put(entityOp.failure(error))
    }
    console.log("put : entity operation fulfill")
    yield put(entityOp.fulfill())
}


/**
 * Watches the action and calls the saga with action as parameter
 * @param action
 * @param doSaga
 */
export function* watchAction(action, doSaga) {
    yield takeLatest(action, doSaga)
}

/**
 * For each entityConfig object in domainConfigs an object with watchers is created,
 * containing watchers for all routines
 * @param domainConfigs config objects for all entities
 * @param routines routines object
 * @param apiFunctions api functions for each routine for each entity
 * @returns {{}|any|any}
 */
export const createWatcherSagas = (domainConfigs, routines, apiFunctions) => {
    return reduce(domainConfigs, (watchers, entityConfig, entityName) => {
        watchers[entityName] = {
            fetchAll: watchAction.bind(null, routines[entityConfig.routineName].FETCH_ALL.TRIGGER,
                makeApiCall.bind(null, routines[entityConfig.routineName].FETCH_ALL, apiFunctions[entityName].fetchAll)),

            fetchById: watchAction.bind(null, routines[entityConfig.routineName].FETCH_BY_ID.TRIGGER,
                makeApiCall.bind(null, routines[entityConfig.routineName].FETCH_BY_ID, apiFunctions[entityName].fetchById)),

            search: watchAction.bind(null, routines[entityConfig.routineName].SEARCH.TRIGGER,
                makeApiCall.bind(null, routines[entityConfig.routineName].SEARCH, apiFunctions[entityName].search)),

            create: watchAction.bind(null, routines[entityConfig.routineName].CREATE.TRIGGER,
                makeApiCall.bind(null, routines[entityConfig.routineName].CREATE, apiFunctions[entityName].create)),

            replace: watchAction.bind(null, routines[entityConfig.routineName].REPLACE.TRIGGER,
                makeApiCall.bind(null, routines[entityConfig.routineName].REPLACE, apiFunctions[entityName].replace)),

            update: watchAction.bind(null, routines[entityConfig.routineName].UPDATE.TRIGGER,
                makeApiCall.bind(null, routines[entityConfig.routineName].UPDATE, apiFunctions[entityName].update)),

            delete: watchAction.bind(null, routines[entityConfig.routineName].DELETE.TRIGGER,
                makeApiCall.bind(null, routines[entityConfig.routineName].DELETE, apiFunctions[entityName].delete))
        }
        return watchers
    }, {})

}

/**
 * Create a list of fork-effects for each leaf node (watcher) of the watcherSagas object.
 * @param watcherSagas for E entities, each having watchers for R routines
 * @returns {Array} of N x R forks
 */
export const createWatcherSagaForks = (watcherSagas) => {
    let forks = [];
    map(watcherSagas, entityWatchers => {
        map(entityWatchers, watcher => {
            forks.push(fork(watcher))
        })
    })
    return forks
}

/**
 * Create root saga for all forked watcher sagas
 * @param domainConfigs
 * @param routines
 * @param apiFunctions
 */
export function* createRootSaga(domainConfigs, routines, apiFunctions) {
    let watcherSagas = createWatcherSagas(domainConfigs, routines, apiFunctions)
    let watcherSagaForks = createWatcherSagaForks(watcherSagas)

    yield all(watcherSagaForks)
}