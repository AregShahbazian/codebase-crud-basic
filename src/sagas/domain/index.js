import {all, fork} from "redux-saga/effects";
import {
    watchFetchAuthors,
    watchFetchAuthorById,
    watchCreateAuthor,
    watchFetchAuthors2,
    watchFetchAuthorById2,
    watchCreateAuthor2
} from "./author";


/******************************* ROOT *************************************/

export default function* root() {
    yield all([
        fork(watchFetchAuthors),
        fork(watchFetchAuthorById),
        fork(watchCreateAuthor),
        fork(watchFetchAuthors2),
        fork(watchFetchAuthorById2),
        fork(watchCreateAuthor2)
    ])
}
