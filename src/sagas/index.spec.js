import * as sagas from "./index";
import {createOperationTypes, entityActions} from "../actions";
import {callApi, GET, POST} from "../api";

import {testSaga} from "redux-saga-test-plan";

describe('saga', () => {

    const ENTITY_ACTION = 'ENTITY_ACTION'

    const OPERATIONS = createOperationTypes('ENTITY')
    const actions = entityActions(OPERATIONS)

    const fetchEntities = () => {
        return {response: 1, error: 2}
    }

    it('makeApiCall should put request action, then call api function with action payload, ' +
        'then put success or failure action', () => {
        testSaga(sagas.makeApiCall, actions.fetchAll, fetchEntities, actions.fetchAll.do())
            .next()
            .put(actions.fetchAll.request())
            .next()
            .call(fetchEntities, actions.fetchAll.do().payload)
            .next()

    })

    it('watchAction should watch given action and start given saga', () => {
        testSaga(sagas.watchAction, ENTITY_ACTION, sagas.makeApiCall)
            .next()
            .takeLatestEffect(ENTITY_ACTION, sagas.makeApiCall)
            .next()
            .isDone()
    })
})

