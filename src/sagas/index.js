import api from '../services'
import * as actions from '../actions'
import {call, put, takeEvery, takeLatest, all, fork} from 'redux-saga/effects'

/******************************* SUBROUTINES *************************************/

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
function* fetchEntity(entityOp, apiFn, id, data) {
    console.info("put : entity operation request")
    yield put(entityOp.request())
    console.info("call : api function")
    const {response, error} = yield call(apiFn, id)

    if (response) {
        console.info("put : entity operation success\n response: ")
        console.info(response)
        yield put(entityOp.success(response))
    }
    else {
        console.info("put : entity operation failure")
        console.error(error)
        yield put(entityOp.failure(error))
    }
}

export const fetchAuthors = fetchEntity.bind(null, actions.author.getAll, api.fetchAuthors)
export const fetchAuthor = fetchEntity.bind(null, actions.author.getAll, api.fetchAuthor)
export const addAuthor = fetchEntity.bind(null, actions.author.create, api.addAuthor)

export function* doFetchAuthors() {
    console.info("call : fetch authors")
    yield call(fetchAuthors)
}

export function* doFetchAuthor({id}) {
    console.info("call : fetch author", id)
    yield call(fetchAuthor, id)
}

export function* doAddAuthor({name, dateOfBirth}) {
    console.info("call : add authors")
    console.log(name)
    /* yield call(addAuthor, {
         "name": "Author 3",
         "dateOfBirth": "03-03-1993",
     })*/


}

/******************************* WATCHERS *************************************/

export function* watchFetchAuthors() {
    yield takeLatest(actions.FETCH_AUTHORS, doFetchAuthors);
}

export function* watchFetchAuthor() {
    yield takeLatest(actions.FETCH_AUTHOR, doFetchAuthor);
}

export function* watchAddAuthor() {
    yield takeLatest(actions.ADD_AUTHOR, doAddAuthor);
}


/******************************* ROOT *************************************/

export default function* root() {
    yield all([
        fork(watchFetchAuthors),
        fork(watchFetchAuthor),
        fork(watchAddAuthor)
    ])
}
