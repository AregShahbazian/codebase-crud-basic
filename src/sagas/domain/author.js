import {makeApiCall, watchAction} from "../index";
import {CREATE, DO, FETCH_ALL, FETCH_BY_ID} from "../../actions";
import {actionCreators} from "../../actions/domain";
import {api} from "../../api/domain";


/******************************* WORKERS *************************************/
export const doFetchAuthors = makeApiCall.bind(null, actionCreators.author.fetchAll, api.author.fetchAuthors)
export const doFetchAuthorById = makeApiCall.bind(null, actionCreators.author.fetchById, api.author.fetchAuthorById)
export const doCreateAuthor = makeApiCall.bind(null, actionCreators.author.create, api.author.createAuthor)

/******************************* WATCHERS *************************************/
export const watchFetchAuthors = watchAction.bind(null, `AUTHOR/${FETCH_ALL}/${DO}`, doFetchAuthors)
export const watchFetchAuthorById = watchAction.bind(null, `AUTHOR/${FETCH_BY_ID}/${DO}`, doFetchAuthorById)
export const watchCreateAuthor = watchAction.bind(null, `AUTHOR/${CREATE}/${DO}`, doCreateAuthor)