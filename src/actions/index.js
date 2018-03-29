import {createRoutine} from "redux-saga-routines";
import {createAction} from "redux-actions"

const FETCH_BY_ID = 'FETCH_BY_ID'
const FILTER = 'FILTER'
const CREATE = 'CREATE'
const REPLACE = 'REPLACE'
const UPDATE = 'UPDATE'
const DELETE = 'DELETE'
const FORM = 'FORM'

export const entityOps = [FETCH_BY_ID, FILTER, CREATE, REPLACE, UPDATE, DELETE];

/**
 * Creates CRUD action creator routines for each routine name
 * @param routineNames
 */
export const entityRoutines = (routineNames) => {
    return routineNames.reduce((acc, val) => {
        acc[val] = entityOps.reduce((acc2, val2) => {
            /* Create CRUD routines for each entity*/

            acc2[val2] = createRoutine(
                `${val}/${val2}`,
                (payload) => payload,
                (payload, meta) => meta
            )

            /* Create form actions for each entity*/

            acc2.FORM = {}

            let formPrepareCreateName = `${val}/FORM/PREPARE_CREATE`;
            acc2.FORM.prepareCreate = createAction(
                formPrepareCreateName,
                (payload) => (payload)
            )
            acc2.FORM.PREPARE_CREATE = formPrepareCreateName

            let formPrepareUpdateName = `${val}/FORM/PREPARE_UPDATE`;
            acc2.FORM.prepareUpdate = createAction(
                formPrepareUpdateName,
                (payload) => (payload)
            )
            acc2.FORM.PREPARE_UPDATE = formPrepareUpdateName

            return acc2
        }, {})

        return acc
    }, {})

}

/**
 * Creates routines-objects for the list of routine-names
 * @param domainConfigs
 */
export const createDomainRoutines = (domainConfigs) => {
    return entityRoutines(Object.values(domainConfigs).map(e => e.routineName))
}



