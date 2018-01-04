import {all, fork} from "redux-saga/effects";
import {
    watchCreateAuthor,
    watchDeleteAuthor,
    watchFetchAuthorById,
    watchFetchAuthors,
    watchReplaceAuthor,
    watchSearchAuthor,
    watchUpdateAuthor
} from "./bookstore";


/******************************* ROOT *************************************/

export default function* root() {
    yield all([
        fork(watchFetchAuthors),
        fork(watchFetchAuthorById),
        fork(watchSearchAuthor),
        fork(watchCreateAuthor),
        fork(watchReplaceAuthor),
        fork(watchUpdateAuthor),
        fork(watchDeleteAuthor)
    ])
}
