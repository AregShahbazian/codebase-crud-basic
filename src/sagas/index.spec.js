import * as sagas from "./index";
import {entityActionCreators} from "../actions";

import {testSaga} from "redux-saga-test-plan";

describe('saga', () => {
    const actionCreators = entityActionCreators(["ENTITY"])
    const apiFn = jest.fn();

    const PAYLOAD = "PAYLOAD";
    const RESPONSE = "response";
    const ERROR = "error";

    it('makeApiCall should put request action, then call api function with action payload, ' +
        'then put success or failure action', () => {
        testSaga(sagas.makeApiCall, actionCreators.entity.fetchAll, apiFn, actionCreators.entity.fetchAll.do(PAYLOAD))
            .next()
            .put(actionCreators.entity.fetchAll.request())
            .next()
            .call(apiFn, PAYLOAD)
            .next({response: RESPONSE})
            .put(actionCreators.entity.fetchAll.success(RESPONSE))
            .next()
            .isDone()
            .back(2)
            .next({error: ERROR})
            .put(actionCreators.entity.fetchAll.failure(ERROR))
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

