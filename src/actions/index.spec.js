import {entityActionCreators} from "./index";


describe('entity action creators', () => {
    const actionCreators = entityActionCreators(["ENTITY"])

    it('For entity, fetchAll should have a do, request, success and failure action creator', () => {
        expect(actionCreators.entity.fetchAll.do()).toEqual({
            type: 'ENTITY/FETCH_ALL/DO'
        })
        expect(actionCreators.entity.fetchAll.request()).toEqual({
            type: 'ENTITY/FETCH_ALL/REQUEST'
        })
        expect(actionCreators.entity.fetchAll.success()).toEqual({
            type: 'ENTITY/FETCH_ALL/SUCCESS'
        })
        expect(actionCreators.entity.fetchAll.failure()).toEqual({
            type: 'ENTITY/FETCH_ALL/FAILURE'
        })
    })

    it('For entity, fetchById should have a do, request, success and failure action creator', () => {
        expect(actionCreators.entity.fetchById.do()).toEqual({
            type: 'ENTITY/FETCH_BY_ID/DO'
        })
        expect(actionCreators.entity.fetchById.request()).toEqual({
            type: 'ENTITY/FETCH_BY_ID/REQUEST'
        })
        expect(actionCreators.entity.fetchById.success()).toEqual({
            type: 'ENTITY/FETCH_BY_ID/SUCCESS'
        })
        expect(actionCreators.entity.fetchById.failure()).toEqual({
            type: 'ENTITY/FETCH_BY_ID/FAILURE'
        })
    })

    it('For entity, fetchById should have a do, request, success and failure action creator', () => {
        expect(actionCreators.entity.create.do()).toEqual({
            type: 'ENTITY/CREATE/DO'
        })
        expect(actionCreators.entity.create.request()).toEqual({
            type: 'ENTITY/CREATE/REQUEST'
        })
        expect(actionCreators.entity.create.success()).toEqual({
            type: 'ENTITY/CREATE/SUCCESS'
        })
        expect(actionCreators.entity.create.failure()).toEqual({
            type: 'ENTITY/CREATE/FAILURE'
        })
    })
})


