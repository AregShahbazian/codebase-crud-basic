import {combineReducers} from 'redux'
import authorsData from './authorsData'
import authorsFilter from './authorsFilter'

const crudApp = combineReducers({
    authorsData,
    authorsFilter
})

export default crudApp
