import {makeApiCall, watchAction} from "../index";
import {routines} from "../../actions/domain";
import {api} from "../../api/domain";


/******************************* WORKERS *************************************/
export const doFetchAuthors = makeApiCall.bind(null, routines.AUTHOR.FETCH_ALL, api.author.fetchAuthors)
export const doFetchAuthorById = makeApiCall.bind(null, routines.AUTHOR.FETCH_BY_ID, api.author.fetchAuthorById)
export const doCreateAuthor = makeApiCall.bind(null, routines.AUTHOR.CREATE, api.author.createAuthor)

/******************************* WATCHERS *************************************/
export const watchFetchAuthors = watchAction.bind(null, routines.AUTHOR.FETCH_ALL.TRIGGER, doFetchAuthors)
export const watchFetchAuthorById = watchAction.bind(null, routines.AUTHOR.FETCH_BY_ID.TRIGGER, doFetchAuthorById)
export const watchCreateAuthor = watchAction.bind(null, routines.AUTHOR.CREATE.TRIGGER, doCreateAuthor)