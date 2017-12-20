import {createRoutine} from "redux-saga-routines";

export const FETCH_ALL = 'FETCH_ALL'
export const FETCH_BY_ID = 'FETCH_BY_ID'
export const CREATE = 'CREATE'

export const DO = 'DO'
export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'


/**
 * The CRUD action creator routines for each entity name
 * */
export const entityRoutines = (entityNames) => {
    return entityNames.reduce((acc, val) => {
        acc[val] = [FETCH_ALL, FETCH_BY_ID, CREATE].reduce((acc2, val2) => {
            acc2[val2] = createRoutine(`${val}/${val2}`)
            return acc2
        }, {})
        return acc
    }, {})

}

