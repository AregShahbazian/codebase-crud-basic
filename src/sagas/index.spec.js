import * as sagas from "./index";
import {entityRoutines} from "../actions";

import {testSaga} from "redux-saga-test-plan";

describe('saga', () => {
    const routines = entityRoutines(["MY_ENTITY"])
    const apiFn = jest.fn();

    const PAYLOAD = "PAYLOAD";
    const RESPONSE = "response";
    const ERROR = "error";

    it('makeApiCall should put request action, then call api function with action payload, ' +
        'then put success or failure action', () => {
        testSaga(sagas.makeApiCall, routines.MY_ENTITY.FETCH_ALL, apiFn, routines.MY_ENTITY.FETCH_ALL.trigger(PAYLOAD))
            .next()
            .put(routines.MY_ENTITY.FETCH_ALL.request())
            .next()
            .call(apiFn, PAYLOAD, undefined)
            .next({response: RESPONSE})
            .put(routines.MY_ENTITY.FETCH_ALL.success(RESPONSE))
            .next()
            .put(routines.MY_ENTITY.FETCH_ALL.fulfill())
            .next()
            .isDone()
            .back(3)
            .next({error: ERROR})
            .put(routines.MY_ENTITY.FETCH_ALL.failure(ERROR))
            .next()
            .put(routines.MY_ENTITY.FETCH_ALL.fulfill())
            .next()
            .isDone()
    })

    const MY_ENTITY_ACTION = 'MY_ENTITY_ACTION'

    it('watchAction should watch given action and start given saga', () => {
        testSaga(sagas.watchAction, MY_ENTITY_ACTION, sagas.makeApiCall)
            .next()
            .takeLatestEffect(MY_ENTITY_ACTION, sagas.makeApiCall)
            .next()
            .isDone()
    })

})

