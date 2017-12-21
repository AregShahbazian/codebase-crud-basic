import {entityOps, entityRoutines} from "./index";

describe('entity action creators', () => {
    const routines = entityRoutines(["ENTITY"])

    entityOps.forEach((op) => (
        it(`For entity, ${op} should have a trigger, request, success and failure action creator`, () => {
            expect(routines.ENTITY[op].trigger()).toEqual({
                type: `ENTITY/${op}/TRIGGER`
            })
            expect(routines.ENTITY[op].request()).toEqual({
                type: `ENTITY/${op}/REQUEST`
            })
            expect(routines.ENTITY[op].success()).toEqual({
                type: `ENTITY/${op}/SUCCESS`
            })
            expect(routines.ENTITY[op].failure()).toEqual({
                type: `ENTITY/${op}/FAILURE`
            })
            expect(routines.ENTITY[op].fulfill()).toEqual({
                type: `ENTITY/${op}/FULFILL`
            })
        })
    ))

})




