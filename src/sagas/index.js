import api from '../services'
import * as actions from '../actions'
import {call, put, takeEvery, takeLatest, all, fork} from 'redux-saga/effects'

/******************************* SUBROUTINES *************************************/

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
function* fetchEntity(entity, apiFn, data) {
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
export const postAuthor = fetchEntity.bind(null, actions.author, api.addAuthor)

export function* loadAuthors() {
    console.log("loadAuthors saga")
    yield call(fetchAuthors)
}

export function* addAuthor({name, dateOfBirth}) {
    console.log("addAuthor saga")
    console.log(name)
   /* yield call(postAuthor, {
        "name": "Author 3",
        "dateOfBirth": "03-03-1993",
    })*/


}

/******************************* WATCHERS *************************************/

export function* watchLoadAuthors() {
    yield takeLatest(actions.FETCH_AUTHORS, loadAuthors);
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
