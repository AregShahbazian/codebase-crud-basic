import {createRoutine} from "redux-saga-routines";
import {createAction} from "redux-actions"

const FETCH_ALL = 'FETCH_ALL'
const FETCH_BY_ID = 'FETCH_BY_ID'
const SEARCH = 'SEARCH'
const CREATE = 'CREATE'
const REPLACE = 'REPLACE'
const UPDATE = 'UPDATE'
const DELETE = 'DELETE'
const FORM = 'FORM'

export const entityOps = [FETCH_ALL, FETCH_BY_ID, SEARCH, CREATE, REPLACE, UPDATE, DELETE];

/**
 * The CRUD action creator routines for each entity name
 * */
export const entityRoutines = (entityNames) => {
    return entityNames.reduce((acc, val) => {
        acc[val] = entityOps.reduce((acc2, val2) => {
            /* Create CRUD routines for each entity*/

            acc2[val2] = createRoutine(
                `${val}/${val2}`,
                (payload) => payload,
                (payload, meta) => (meta ? {id: meta.id} : undefined)
            )

            /* Create form actions for each entity*/

            acc2.FORM = {}

            let formEditName = `${val}/FORM/PREPARE`;
            acc2.FORM.prepare = createAction(
                formEditName,
                (payload) => (payload)
            )
            acc2.FORM.PREPARE = formEditName

            return acc2
        }, {})

        return acc
    }, {})

}

export const createDomainRoutines = (domainConfigs) => {
    return entityRoutines(domainConfigs.map(e => e.routineName))
}



