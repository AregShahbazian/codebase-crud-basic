import {combineReducers} from 'redux'
import authors from './authors'
import authorsFilter from './authorsFilter'

const crudApp = combineReducers({
    authors,
    authorsFilter
})

export default crudApp
