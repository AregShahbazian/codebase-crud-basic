import * as sagas from "./index";
import {createOperationTypes, entityActions} from "../actions";

import {testSaga} from "redux-saga-test-plan";

describe('saga', () => {

    const OPERATIONS = createOperationTypes('ENTITY')
    const actions = entityActions(OPERATIONS)

    const apiFn = jest.fn();

    const RESPONSE = "response";
    const ERROR = "error";

    it('makeApiCall should put request action, then call api function with action payload, ' +
        'then put success or failure action', () => {
        testSaga(sagas.makeApiCall, actions.fetchAll, apiFn, actions.fetchAll.do())
            .next()
            .put(actions.fetchAll.request())
            .next()
            .call(apiFn, actions.fetchAll.do().payload)
            .next({response: RESPONSE})
            .put(actions.fetchAll.success(RESPONSE))
            .next()
            .isDone()
            .back(2)
            .next({error: ERROR})
            .put(actions.fetchAll.failure(ERROR))
            .next()
            .isDone()
    })

    const ENTITY_ACTION = 'ENTITY_ACTION'

    it('watchAction should watch given action and start given saga', () => {
        testSaga(sagas.watchAction, ENTITY_ACTION, sagas.makeApiCall)
            .next()
            .takeLatestEffect(ENTITY_ACTION, sagas.makeApiCall)
            .next()
            .isDone()
    })

})

