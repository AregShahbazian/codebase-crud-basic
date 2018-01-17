import {call, put, takeLatest} from "redux-saga/effects";


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
        console.log("put : entity operation success\n response: %s", JSON.stringify(response))
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


export const createWatcherSagas = (entityConfigs, routines, apiFunctions) => {
    return entityConfigs.reduce((acc, val) => {
        acc[val.entityName] = {
            fetchAll: watchAction.bind(null, routines[val.routineName].FETCH_ALL.TRIGGER,
                makeApiCall.bind(null, routines[val.routineName].FETCH_ALL, apiFunctions[val.entityName].fetchAll)),

            fetchById: watchAction.bind(null, routines[val.routineName].FETCH_BY_ID.TRIGGER,
                makeApiCall.bind(null, routines[val.routineName].FETCH_BY_ID, apiFunctions[val.entityName].fetchById)),

            search: watchAction.bind(null, routines[val.routineName].SEARCH.TRIGGER,
                makeApiCall.bind(null, routines[val.routineName].SEARCH, apiFunctions[val.entityName].search)),

            create: watchAction.bind(null, routines[val.routineName].CREATE.TRIGGER,
                makeApiCall.bind(null, routines[val.routineName].CREATE, apiFunctions[val.entityName].create)),

            replace: watchAction.bind(null, routines[val.routineName].REPLACE.TRIGGER,
                makeApiCall.bind(null, routines[val.routineName].REPLACE, apiFunctions[val.entityName].replace)),

            update: watchAction.bind(null, routines[val.routineName].UPDATE.TRIGGER,
                makeApiCall.bind(null, routines[val.routineName].UPDATE, apiFunctions[val.entityName].update)),

            delete: watchAction.bind(null, routines[val.routineName].DELETE.TRIGGER,
                makeApiCall.bind(null, routines[val.routineName].DELETE, apiFunctions[val.entityName].delete))
        }
        return acc
    }, {})

}



