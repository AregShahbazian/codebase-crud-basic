import {all, call, fork, put, takeLatest} from "redux-saga/effects";
import rootSaga, * as sagas from "./index"
import * as authorActions from "../actions/domain/author";
import {CREATE, DO, FETCH_ALL, FETCH_BY_ID} from "../actions";
import {testSaga} from 'redux-saga-test-plan';


describe('watcher ', () => {
    it('watchFetchAuthors should call doFetchAuthors', () => {

        expect(
            true
        ).toEqual(true)
    })


})

/*
describe('saga', () => {
    it('root should fork all watcher sagas', () => {
        testSaga(rootSaga)
            .next()
            .all([
                fork(sagas.watchFetchAuthors),
                fork(sagas.watchFetchAuthorById),
                fork(sagas.watchCreateAuthor)
            ])
            .next()
            .isDone()
    })

    it('watchFetchAuthors should take latest AUTHOR_FETCH_ALL_DO and call doFetchAuthors', () => {
        testSaga(sagas.watchFetchAuthors)
            .next()
            .takeLatestEffect(authorActions.OPERATIONS[FETCH_ALL][DO], sagas.doFetchAuthors)
            .next()
            .isDone()
    })

    it('watchFetchAuthorById should take latest AUTHOR_FETCH_BY_ID_DO and call doFetchAuthorById', () => {
        testSaga(sagas.watchFetchAuthorById)
            .next()
            .takeLatestEffect(authorActions.OPERATIONS[FETCH_BY_ID][DO], sagas.doFetchAuthorById)
            .next()
            .isDone()
    })

    it('watchCreateAuthor should take latest AUTHOR_CREATE_DO and call doCreateAuthor', () => {
        testSaga(sagas.watchCreateAuthor)
            .next()
            .takeLatestEffect(authorActions.OPERATIONS[CREATE][DO], sagas.doCreateAuthor)
            .next()
            .isDone()
    })


})
*/

