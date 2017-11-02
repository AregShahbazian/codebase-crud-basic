import {combineReducers} from "redux";
import authorsData from "./authorsData";
import {reducer as formReducer} from "redux-form";

const crudApp = combineReducers({
    authorsData,
    form: formReducer
})

export default crudApp
