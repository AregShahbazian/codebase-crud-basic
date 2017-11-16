import {all, fork} from "redux-saga/effects";
import {watchFetchAuthors, watchFetchAuthorById, watchCreateAuthor} from "./author";


/******************************* ROOT *************************************/

export default function* root() {
    yield all([
        fork(watchFetchAuthors),
        fork(watchFetchAuthorById),
        fork(watchCreateAuthor)
    ])
}
