import {combineReducers} from 'redux'
import authorsData from './authorsData'
import authorsFilter from './authorsFilter'
import { reducer as formReducer } from 'redux-form'

const crudApp = combineReducers({
    authorsData,
    authorsFilter,
    form: formReducer
})

export default crudApp
