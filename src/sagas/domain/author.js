import {makeApiCall, watchAction} from "../index";
import {CREATE, DO, FETCH_ALL, FETCH_BY_ID} from "../../actions";
import * as authorActions from "../../actions/domain/author";
import * as authorApi from "../../api/domain/author";


/******************************* WORKERS *************************************/
export const doFetchAuthors = makeApiCall.bind(null, authorActions.entityActions.fetchAll, authorApi.fetchAuthors)
export const doFetchAuthorById = makeApiCall.bind(null, authorActions.entityActions.fetchById, authorApi.fetchAuthorById)
export const doCreateAuthor = makeApiCall.bind(null, authorActions.entityActions.create, authorApi.createAuthor)

/******************************* WATCHERS *************************************/
export const watchFetchAuthors = watchAction.bind(null, authorActions.OPERATIONS[FETCH_ALL][DO], doFetchAuthors)
export const watchFetchAuthorById = watchAction.bind(null, authorActions.OPERATIONS[FETCH_BY_ID][DO], doFetchAuthorById)
export const watchCreateAuthor = watchAction.bind(null, authorActions.OPERATIONS[CREATE][DO], doCreateAuthor)