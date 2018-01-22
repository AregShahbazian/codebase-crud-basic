import config from "react-global-configuration";
import {all, fork} from "redux-saga/effects";
import {createWatcherSagas,createWatcherSagaForks} from "../index";
import {api} from "../../api/domain";
import {routines} from "../../actions/domain";

import {
    watchCreateAuthor,
    watchDeleteAuthor,
    watchFetchAuthorById,
    watchFetchAuthors,
    watchReplaceAuthor,
    watchSearchAuthor,
    watchUpdateAuthor
} from "./bookstore";


const watcherSagas = createWatcherSagas(config.get("entities"), routines, api)
const watcherSagaForks = createWatcherSagaForks(watcherSagas)
console.info(watcherSagaForks)

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
