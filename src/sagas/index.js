import api from '../services'
import * as actions from '../actions'
import {call, put, takeEvery, takeLatest, all, fork} from 'redux-saga/effects'

/******************************* SUBROUTINES *************************************/

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
function* fetchEntity(entity, apiFn) {
    console.log("Fetching ...")
    yield put(entity.request())
    const {response, error} = yield call(apiFn)

    if (response) {
        yield put(entity.success(response))
    }
    else {
        console.error(error)
        yield put(entity.failure(error))
    }
}

export const fetchAuthors = fetchEntity.bind(null, actions.author, api.fetchAuthors)

export function* loadAuthors() {
    console.log("loadAuthors saga")
    yield call(fetchAuthors)
}

export function* addAuthor({name, dateOfBirth, numberOfBooks}) {
    console.log("addAuthor saga")
    console.log(name)

}

/******************************* WATCHERS *************************************/

export function* watchLoadAuthors() {
    yield takeLatest(actions.LOAD_AUTHORS, loadAuthors);
}

export function* watchAddAuthor() {
    yield takeLatest(actions.ADD_AUTHOR, addAuthor);
}


/******************************* ROOT *************************************/

export default function* root() {
    yield all([
        fork(watchLoadAuthors),
        fork(watchAddAuthor)
    ])
}
