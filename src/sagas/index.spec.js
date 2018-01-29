import "../config/index";
import {createWatcherSagaForks, createWatcherSagas, makeApiCall, watchAction, rootSaga} from "./index";
import {createEntityRoutines, entityRoutines} from "../actions";
import {fork} from "redux-saga/effects";
import {createApiFunctions} from "../api";
import {normalize, schema} from "normalizr";
import {testSaga} from "redux-saga-test-plan";


describe('saga makeApiCall', () => {
    const routines = entityRoutines(["MY_ENTITY"])
    const apiFn = jest.fn();

    const PAYLOAD = "PAYLOAD";
    const RESPONSE = "response";
    const ERROR = "error";

    it('should put request action, then call api function with action payload, ' +
        'then put success or failure action', () => {
        testSaga(makeApiCall, routines.MY_ENTITY.FETCH_ALL, apiFn, routines.MY_ENTITY.FETCH_ALL.trigger(PAYLOAD))
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


})

describe('saga watchAction', () => {
    const MY_ENTITY_ACTION = 'MY_ENTITY_ACTION'

    it('should watch given action and start given saga', () => {
        testSaga(watchAction, MY_ENTITY_ACTION, makeApiCall)
            .next()
            .takeLatestEffect(MY_ENTITY_ACTION, makeApiCall)
            .next()
            .isDone()
    })
})


describe('createWatcherSagas', () => {
    const myEntity1 = "myEntity1";
    const myEntity1Schema = new schema.Entity(myEntity1)
    const myEntity1InitialState = normalize([], new schema.Array(myEntity1Schema))

    const myEntity1Config = {
        entityName: myEntity1,
        endpoint: "myEntity1",
        routineName: "MY_ENTITY1",
        schema: myEntity1Schema,
        initialState: myEntity1InitialState
    }

    const myEntity2 = "myEntity2";
    const myEntity2Schema = new schema.Entity(myEntity2)
    const myEntity2InitialState = normalize([], new schema.Array(myEntity2Schema))

    const myEntity2Config = {
        entityName: myEntity2,
        endpoint: "myEntity2",
        routineName: "MY_ENTITY2",
        schema: myEntity2Schema,
        initialState: myEntity2InitialState
    }

    const mockEntityConfigs = [myEntity1Config, myEntity2Config]

    const a = ["fetchAll", "fetchById", "search", "create", "replace", "update", "delete"]
    const myEntityRoutines = createEntityRoutines(mockEntityConfigs)
    const apiFunctions = createApiFunctions(mockEntityConfigs)
    const watcherSagas = createWatcherSagas(mockEntityConfigs, myEntityRoutines, apiFunctions)

    a.forEach((a) => {
        it(`should create watcher for ${a}.TRIGGER, for each entity using configuration object`, () => {
            expect(watcherSagas.myEntity1[a].name).toEqual("bound watchAction")
        })
    })
})


describe('createWatcherSagaForks', () => {

    const WATCHER_FOO_1 = jest.fn();
    const WATCHER_BAR_1 = jest.fn();
    const WATCHER_FOO_2 = jest.fn();
    const WATCHER_BAR_2 = jest.fn();

    const mockWatcherSagas = {
        myEntity1: {foo: WATCHER_FOO_1, bar: WATCHER_BAR_1},
        myEntity2: {foo: WATCHER_FOO_2, bar: WATCHER_BAR_2}
    }

    const watcherSagaForks = createWatcherSagaForks(mockWatcherSagas)

    it("should create a fork for each leaf in the provided object", () => {
        expect(watcherSagaForks).toEqual(
            [fork(WATCHER_FOO_1), fork(WATCHER_BAR_1), fork(WATCHER_FOO_2), fork(WATCHER_BAR_2)]
        )
    })

})



