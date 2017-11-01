import {call, put, takeEvery, takeLatest, all, fork} from 'redux-saga/effects'

import api from '../services'
import * as actions from '../actions'
import * as author from '../actions/author'


const {FETCH_ALL, FETCH_BY_ID, CREATE, DO, REQUEST, SUCCESS, FAILURE} = actions

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

export const fetchAuthors = fetchEntity.bind(null, author.actions.fetchAll, api.fetchAuthors)
export const fetchAuthorById = fetchEntity.bind(null, author.actions.fetchById, api.fetchAuthorById)
export const createAuthor = fetchEntity.bind(null, author.actions.create, api.createAuthor)

export function* doFetchAuthors() {
    console.info("call : fetch authors")
    yield call(fetchAuthors)
}

export function* doFetchAuthorById({id}) {
    console.info("call : fetch author id: %d", id)
    yield call(fetchAuthorById, id)
}

export function* doCreateAuthor({name, dateOfBirth}) {
    console.info("call : add authors")
    console.log(name)
    /* yield call(createAuthor, {
         "name": "Author 3",
         "dateOfBirth": "03-03-1993",
     })*/


}

/******************************* WATCHERS *************************************/

export function* watchFetchAuthors() {
    yield takeLatest(author.OPERATIONS[FETCH_ALL][DO], doFetchAuthors);
}

export function* watchFetchAuthorById() {
    yield takeLatest(author.OPERATIONS[FETCH_BY_ID][DO], doFetchAuthorById);
}

export function* watchCreateAuthor() {
    yield takeLatest(author.OPERATIONS[CREATE][DO], doCreateAuthor);
}


/******************************* ROOT *************************************/

export default function* root() {
    yield all([
        fork(watchFetchAuthors),
        fork(watchFetchAuthorById),
        fork(watchCreateAuthor)
    ])
}
