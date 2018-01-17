import config from "react-global-configuration";
import {all, fork} from "redux-saga/effects";
import {createWatcherSagas} from "../index";
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
// const forks = watcherSagas.map(w => fork(w))

console.info(watcherSagas)

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
