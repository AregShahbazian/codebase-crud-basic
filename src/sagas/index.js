import * as actions from '../actions'
import {call, put, takeEvery, takeLatest, all, fork} from 'redux-saga/effects'

export function* watchFetchAuthors() {
    yield takeLatest(actions.FETCH_AUTHORS, ({name, dateOfBirth, numberOfBooks}) => {
        console.log(name2)
    });
}

export default function* root() {
    yield all([
        fork(watchFetchAuthors)
    ])
}
