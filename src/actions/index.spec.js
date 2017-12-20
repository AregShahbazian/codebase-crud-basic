import {entityRoutines} from "./index";

describe('entity action creators', () => {
    const routines = entityRoutines(["ENTITY"])

    it('For entity, fetchAll should have a do, request, success and failure action creator', () => {
        expect(routines.ENTITY.FETCH_ALL.trigger()).toEqual({
            type: 'ENTITY/FETCH_ALL/TRIGGER'
        })
        expect(routines.ENTITY.FETCH_ALL.request()).toEqual({
            type: 'ENTITY/FETCH_ALL/REQUEST'
        })
        expect(routines.ENTITY.FETCH_ALL.success()).toEqual({
            type: 'ENTITY/FETCH_ALL/SUCCESS'
        })
        expect(routines.ENTITY.FETCH_ALL.failure()).toEqual({
            type: 'ENTITY/FETCH_ALL/FAILURE'
        })
        expect(routines.ENTITY.FETCH_ALL.fulfill()).toEqual({
            type: 'ENTITY/FETCH_ALL/FULFILL'
        })
    })

    it('For entity, fetchById should have a trigger, request, success and failure action creator', () => {
        expect(routines.ENTITY.FETCH_BY_ID.trigger()).toEqual({
            type: 'ENTITY/FETCH_BY_ID/TRIGGER'
        })
        expect(routines.ENTITY.FETCH_BY_ID.request()).toEqual({
            type: 'ENTITY/FETCH_BY_ID/REQUEST'
        })
        expect(routines.ENTITY.FETCH_BY_ID.success()).toEqual({
            type: 'ENTITY/FETCH_BY_ID/SUCCESS'
        })
        expect(routines.ENTITY.FETCH_BY_ID.failure()).toEqual({
            type: 'ENTITY/FETCH_BY_ID/FAILURE'
        })
        expect(routines.ENTITY.FETCH_BY_ID.fulfill()).toEqual({
            type: 'ENTITY/FETCH_BY_ID/FULFILL'
        })
    })

    it('For entity, fetchById should have a trigger, request, success and failure action creator', () => {
        expect(routines.ENTITY.CREATE.trigger()).toEqual({
            type: 'ENTITY/CREATE/TRIGGER'
        })
        expect(routines.ENTITY.CREATE.request()).toEqual({
            type: 'ENTITY/CREATE/REQUEST'
        })
        expect(routines.ENTITY.CREATE.success()).toEqual({
            type: 'ENTITY/CREATE/SUCCESS'
        })
        expect(routines.ENTITY.CREATE.failure()).toEqual({
            type: 'ENTITY/CREATE/FAILURE'
        })
        expect(routines.ENTITY.CREATE.fulfill()).toEqual({
            type: 'ENTITY/CREATE/FULFILL'
        })
    })
})




