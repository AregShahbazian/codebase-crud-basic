import {entityOps, entityRoutines} from "./index";

describe('entity action creators', () => {
    const routines = entityRoutines(["ENTITY"])
    const PAYLOAD = "PAYLOAD";
    const META = "META";

    entityOps.forEach((op) => (
        it(`For entity, ${op} should have a trigger, request, success and failure action creator`, () => {
            expect(routines.ENTITY[op].trigger(PAYLOAD, META)).toEqual({
                type: `ENTITY/${op}/TRIGGER`,
                payload:PAYLOAD,
                meta:META
            })
            expect(routines.ENTITY[op].request(PAYLOAD, META)).toEqual({
                type: `ENTITY/${op}/REQUEST`,
                payload:PAYLOAD,
                meta:META

            })
            expect(routines.ENTITY[op].success(PAYLOAD, META)).toEqual({
                type: `ENTITY/${op}/SUCCESS`,
                payload:PAYLOAD,
                meta:META

            })
            expect(routines.ENTITY[op].failure(PAYLOAD, META)).toEqual({
                type: `ENTITY/${op}/FAILURE`,
                payload:PAYLOAD,
                meta:META

            })
            expect(routines.ENTITY[op].fulfill(PAYLOAD, META)).toEqual({
                type: `ENTITY/${op}/FULFILL`,
                payload:PAYLOAD,
                meta:META

            })
        })
    ))

})




