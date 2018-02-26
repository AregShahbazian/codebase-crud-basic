import {createDomainRoutines, entityOps, entityRoutines} from "./index";

describe('myEntity action creators', () => {
    const routines = entityRoutines(["MY_ENTITY"])
    const PAYLOAD = "PAYLOAD";
    const META = {id: 123};

    entityOps.forEach((op) => (
        it(`For myEntity, ${op} should have a trigger, request, success and failure action creator`, () => {
            expect(routines.MY_ENTITY[op].trigger(PAYLOAD, META)).toEqual({
                type: `MY_ENTITY/${op}/TRIGGER`,
                payload: PAYLOAD,
                meta: {id: 123}
            })
            expect(routines.MY_ENTITY[op].request(PAYLOAD, META)).toEqual({
                type: `MY_ENTITY/${op}/REQUEST`,
                payload: PAYLOAD,
                meta: {id: 123}

            })
            expect(routines.MY_ENTITY[op].success(PAYLOAD, META)).toEqual({
                type: `MY_ENTITY/${op}/SUCCESS`,
                payload: PAYLOAD,
                meta: {id: 123}

            })
            expect(routines.MY_ENTITY[op].failure(PAYLOAD, META)).toEqual({
                type: `MY_ENTITY/${op}/FAILURE`,
                payload: PAYLOAD,
                meta: {id: 123}

            })
            expect(routines.MY_ENTITY[op].fulfill(PAYLOAD, META)).toEqual({
                type: `MY_ENTITY/${op}/FULFILL`,
                payload: PAYLOAD,
                meta: {id: 123}

            })
        })
    ))

    // console.log(routines)

    expect(routines.MY_ENTITY.FORM.edit({id: 123})).toEqual({
        type: "MY_ENTITY/EDIT",
        payload: {id: 123}
    })
})


describe('createDomainRoutines', () => {

    const myEntity1 = "myEntity1";
    const myEntity1Config = {
        routineName: "MY_ENTITY1",
    }

    const myEntity2 = "myEntity2";
    const myEntity2Config = {
        routineName: "MY_ENTITY2",
    }

    const domainConfigs = [myEntity1Config, myEntity2Config]

    const a = ["fetchAll", "fetchById", "search", "create", "replace", "update", "delete"]
    const myEntityRoutines = createDomainRoutines(domainConfigs)

    a.forEach((a) => {
        it(`should create routine for ${a}, for each entity using configuration object`, () => {
            expect(myEntityRoutines.toString()).toEqual(
                entityRoutines([myEntity1Config.routineName, myEntity2Config.routineName]).toString()
            )
        })
    })

})
