import {all, fork} from "redux-saga/effects";
import {watchCreateAuthor, watchFetchAuthorById, watchFetchAuthors} from "./author";


/******************************* ROOT *************************************/

export default function* root() {
    yield all([
        fork(watchFetchAuthors),
        fork(watchFetchAuthorById),
        fork(watchCreateAuthor)
    ])
}
