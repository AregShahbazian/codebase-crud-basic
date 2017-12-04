import {combineReducers} from "redux";
import authorReducer from "./author";
import {reducer as formReducer} from "redux-form";
import undoable, {distinctState} from "redux-undo";

const author = undoable(authorReducer, {
    filter: distinctState()
})

export default combineReducers({
    author,
    form: formReducer
})

