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


export const createWatcherSagas = (domainConfigs, routines, apiFunctions) => {
    return reduce(domainConfigs,(acc, val, key) => {
        acc[key] = {
            fetchAll: watchAction.bind(null, routines[val.routineName].FETCH_ALL.TRIGGER,
                makeApiCall.bind(null, routines[val.routineName].FETCH_ALL, apiFunctions[key].fetchAll)),

            fetchById: watchAction.bind(null, routines[val.routineName].FETCH_BY_ID.TRIGGER,
                makeApiCall.bind(null, routines[val.routineName].FETCH_BY_ID, apiFunctions[key].fetchById)),

            search: watchAction.bind(null, routines[val.routineName].SEARCH.TRIGGER,
                makeApiCall.bind(null, routines[val.routineName].SEARCH, apiFunctions[key].search)),

            create: watchAction.bind(null, routines[val.routineName].CREATE.TRIGGER,
                makeApiCall.bind(null, routines[val.routineName].CREATE, apiFunctions[key].create)),

            replace: watchAction.bind(null, routines[val.routineName].REPLACE.TRIGGER,
                makeApiCall.bind(null, routines[val.routineName].REPLACE, apiFunctions[key].replace)),

            update: watchAction.bind(null, routines[val.routineName].UPDATE.TRIGGER,
                makeApiCall.bind(null, routines[val.routineName].UPDATE, apiFunctions[key].update)),

            delete: watchAction.bind(null, routines[val.routineName].DELETE.TRIGGER,
                makeApiCall.bind(null, routines[val.routineName].DELETE, apiFunctions[key].delete))
        }
        return acc
    }, {})

}


export const createWatcherSagaForks = (watcherSagas) => {
    let forks = [];
    map(watcherSagas, entityWatchers => {
        map(entityWatchers, watcher => {
            forks.push(fork(watcher))
        })
    })
    return forks
}


export function* createRootSaga(domainConfigs, routines, apiFunctions) {
    let watcherSagas = createWatcherSagas(domainConfigs, routines, apiFunctions)
    let watcherSagaForks = createWatcherSagaForks(watcherSagas)

    yield all(watcherSagaForks)
}