import {makeApiCall, watchAction} from "../index";
import {routines} from "../../actions/domain";
import {api} from "../../api/domain";


/******************************* WORKERS *************************************/
export const doFetchAuthors = makeApiCall.bind(null, routines.AUTHOR.FETCH_ALL, api.author.fetchAll)
export const doFetchAuthorById = makeApiCall.bind(null, routines.AUTHOR.FETCH_BY_ID, api.author.fetchById)
export const doSearchAuthor = makeApiCall.bind(null, routines.AUTHOR.SEARCH, api.author.search)
export const doCreateAuthor = makeApiCall.bind(null, routines.AUTHOR.CREATE, api.author.create)
export const doReplaceAuthor = makeApiCall.bind(null, routines.AUTHOR.REPLACE, api.author.replace)
export const doUpdateAuthor = makeApiCall.bind(null, routines.AUTHOR.UPDATE, api.author.update)
export const doDeleteAuthor = makeApiCall.bind(null, routines.AUTHOR.DELETE, api.author.delete)

/******************************* WATCHERS *************************************/
export const watchFetchAuthors = watchAction.bind(null, routines.AUTHOR.FETCH_ALL.TRIGGER, doFetchAuthors)
export const watchFetchAuthorById = watchAction.bind(null, routines.AUTHOR.FETCH_BY_ID.TRIGGER, doFetchAuthorById)
export const watchSearchAuthor = watchAction.bind(null, routines.AUTHOR.SEARCH.TRIGGER, doSearchAuthor)
export const watchCreateAuthor = watchAction.bind(null, routines.AUTHOR.CREATE.TRIGGER, doCreateAuthor)
export const watchReplaceAuthor = watchAction.bind(null, routines.AUTHOR.REPLACE.TRIGGER, doReplaceAuthor)
export const watchUpdateAuthor = watchAction.bind(null, routines.AUTHOR.UPDATE.TRIGGER, doUpdateAuthor)
export const watchDeleteAuthor = watchAction.bind(null, routines.AUTHOR.DELETE.TRIGGER, doDeleteAuthor)
