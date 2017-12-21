import {createRoutine} from "redux-saga-routines";

const FETCH_ALL = 'FETCH_ALL'
const FETCH_BY_ID = 'FETCH_BY_ID'
const SEARCH = 'SEARCH'
const CREATE = 'CREATE'
const REPLACE = 'REPLACE'
const UPDATE = 'UPDATE'
const DELETE = 'DELETE'

export const entityOps = [FETCH_ALL, FETCH_BY_ID, SEARCH, CREATE, REPLACE, UPDATE, DELETE];

/**
 * The CRUD action creator routines for each entity name
 * */
export const entityRoutines = (entityNames) => {
    return entityNames.reduce((acc, val) => {
        acc[val] = entityOps.reduce((acc2, val2) => {
            acc2[val2] = createRoutine(`${val}/${val2}`)
            return acc2
        }, {})
        return acc
    }, {})

}

