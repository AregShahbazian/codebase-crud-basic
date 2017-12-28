import {entityOps, entityRoutines} from "./index";

describe('myEntity action creators', () => {
    const routines = entityRoutines(["MY_ENTITY"])
    const PAYLOAD = "PAYLOAD";
    const META = "META";

    entityOps.forEach((op) => (
        it(`For myEntity, ${op} should have a trigger, request, success and failure action creator`, () => {
            expect(routines.MY_ENTITY[op].trigger(PAYLOAD, META)).toEqual({
                type: `MY_ENTITY/${op}/TRIGGER`,
                payload:PAYLOAD,
                meta:META
            })
            expect(routines.MY_ENTITY[op].request(PAYLOAD, META)).toEqual({
                type: `MY_ENTITY/${op}/REQUEST`,
                payload:PAYLOAD,
                meta:META

            })
            expect(routines.MY_ENTITY[op].success(PAYLOAD, META)).toEqual({
                type: `MY_ENTITY/${op}/SUCCESS`,
                payload:PAYLOAD,
                meta:META

            })
            expect(routines.MY_ENTITY[op].failure(PAYLOAD, META)).toEqual({
                type: `MY_ENTITY/${op}/FAILURE`,
                payload:PAYLOAD,
                meta:META

            })
            expect(routines.MY_ENTITY[op].fulfill(PAYLOAD, META)).toEqual({
                type: `MY_ENTITY/${op}/FULFILL`,
                payload:PAYLOAD,
                meta:META

            })
        })
    ))

})




