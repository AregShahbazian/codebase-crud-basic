import * as sagas from "./index";
import {entityRoutines} from "../actions";

import {testSaga} from "redux-saga-test-plan";

describe('saga', () => {
    const routines = entityRoutines(["ENTITY"])
    const apiFn = jest.fn();

    const PAYLOAD = "PAYLOAD";
    const RESPONSE = "response";
    const ERROR = "error";

    it('makeApiCall should put request action, then call api function with action payload, ' +
        'then put success or failure action', () => {
        testSaga(sagas.makeApiCall, routines.ENTITY.FETCH_ALL, apiFn, routines.ENTITY.FETCH_ALL.trigger(PAYLOAD))
            .next()
            .put(routines.ENTITY.FETCH_ALL.request())
            .next()
            .call(apiFn, PAYLOAD, undefined)
            .next({response: RESPONSE})
            .put(routines.ENTITY.FETCH_ALL.success(RESPONSE))
            .next()
            .put(routines.ENTITY.FETCH_ALL.fulfill())
            .next()
            .isDone()
            .back(3)
            .next({error: ERROR})
            .put(routines.ENTITY.FETCH_ALL.failure(ERROR))
            .next()
            .put(routines.ENTITY.FETCH_ALL.fulfill())
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

