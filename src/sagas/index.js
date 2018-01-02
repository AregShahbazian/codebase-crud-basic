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


