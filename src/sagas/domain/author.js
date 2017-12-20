import {makeApiCall, watchAction} from "../index";
import {CREATE, DO, FETCH_ALL, FETCH_BY_ID} from "../../actions";
import {actions, actionCreators} from "../../actions/domain";
import {api} from "../../api/domain";


/******************************* WORKERS *************************************/
export const doFetchAuthors = makeApiCall.bind(null, actions.author.entityActions.fetchAll, api.author.fetchAuthors)
export const doFetchAuthorById = makeApiCall.bind(null, actions.author.entityActions.fetchById, api.author.fetchAuthorById)
export const doCreateAuthor = makeApiCall.bind(null, actions.author.entityActions.create, api.author.createAuthor)

export const doFetchAuthors2 = makeApiCall.bind(null, actionCreators.author.fetchAll, api.author.fetchAuthors)
export const doFetchAuthorById2 = makeApiCall.bind(null, actionCreators.author.fetchById, api.author.fetchAuthorById)
export const doCreateAuthor2 = makeApiCall.bind(null, actionCreators.author.create, api.author.createAuthor)

/******************************* WATCHERS *************************************/
export const watchFetchAuthors = watchAction.bind(null, actions.author.OPERATIONS[FETCH_ALL][DO], doFetchAuthors)
export const watchFetchAuthorById = watchAction.bind(null, actions.author.OPERATIONS[FETCH_BY_ID][DO], doFetchAuthorById)
export const watchCreateAuthor = watchAction.bind(null, actions.author.OPERATIONS[CREATE][DO], doCreateAuthor)

export const watchFetchAuthors2 = watchAction.bind(null, `AUTHOR/${FETCH_ALL}/${DO}`, doFetchAuthors2)
export const watchFetchAuthorById2 = watchAction.bind(null, `AUTHOR/${FETCH_BY_ID}/${DO}`, doFetchAuthorById2)
export const watchCreateAuthor2 = watchAction.bind(null, `AUTHOR/${CREATE}/${DO}`, doCreateAuthor2)