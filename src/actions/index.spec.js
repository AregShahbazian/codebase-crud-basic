import * as actions from './index'

const {FETCH_ALL, FETCH_BY_ID, CREATE, DO, REQUEST, SUCCESS, FAILURE, createOperationTypes} = actions

describe('entity operation types', () => {

    it('createOperationTypes should create operation types', () => {
        expect(createOperationTypes('ENTITY')).toEqual({
            "FETCH_ALL": {
                "DO": "ENTITY_FETCH_ALL_DO",
                "REQUEST": "ENTITY_FETCH_ALL_REQUEST",
                "SUCCESS": "ENTITY_FETCH_ALL_SUCCESS",
                "FAILURE": "ENTITY_FETCH_ALL_FAILURE",
            },
            "FETCH_BY_ID": {
                "DO": "ENTITY_FETCH_BY_ID_DO",
                "REQUEST": "ENTITY_FETCH_BY_ID_REQUEST",
                "SUCCESS": "ENTITY_FETCH_BY_ID_SUCCESS",
                "FAILURE": "ENTITY_FETCH_BY_ID_FAILURE",
            },
            "CREATE": {
                "DO": "ENTITY_CREATE_DO",
                "REQUEST": "ENTITY_CREATE_REQUEST",
                "SUCCESS": "ENTITY_CREATE_SUCCESS",
                "FAILURE": "ENTITY_CREATE_FAILURE",
            },
        })
    })

})


describe('entity actions', () => {

    const ENTITY_OPERATIONS = actions.createOperationTypes('ENTITY')
    const entityActions = actions.entityActions(ENTITY_OPERATIONS)


    it('entityActions.fetchAll.do() should create ENTITY_FETCH_ALL_DO action', () => {
        expect(entityActions.fetchAll.do()).toEqual({
            type: ENTITY_OPERATIONS[FETCH_ALL][DO]
        })
    })

    it('entityActions.fetchAll.request() should create ENTITY_FETCH_ALL_REQUEST action', () => {
        expect(entityActions.fetchAll.request()).toEqual({
            type: ENTITY_OPERATIONS[FETCH_ALL][REQUEST]
        })
    })

    it('entityActions.fetchAll.success() should create ENTITY_FETCH_ALL_SUCCESS action', () => {
        expect(entityActions.fetchAll.success()).toEqual({
            type: ENTITY_OPERATIONS[FETCH_ALL][SUCCESS]
        })
    })

    it('entityActions.fetchAll.failure() should create ENTITY_FETCH_ALL_FAILURE action', () => {
        expect(entityActions.fetchAll.failure()).toEqual({
            type: ENTITY_OPERATIONS[FETCH_ALL][FAILURE]
        })
    })


    it('entityActions.fetchById.do() should create ENTITY_FETCH_ALL_DO action', () => {
        expect(entityActions.fetchById.do()).toEqual({
            type: ENTITY_OPERATIONS[FETCH_BY_ID][DO]
        })
    })

    it('entityActions.fetchById.request() should create ENTITY_FETCH_BY_ID_REQUEST action', () => {
        expect(entityActions.fetchById.request()).toEqual({
            type: ENTITY_OPERATIONS[FETCH_BY_ID][REQUEST]
        })
    })

    it('entityActions.fetchById.success() should create ENTITY_FETCH_BY_ID_SUCCESS action', () => {
        expect(entityActions.fetchById.success()).toEqual({
            type: ENTITY_OPERATIONS[FETCH_BY_ID][SUCCESS]
        })
    })

    it('entityActions.fetchById.failure() should create ENTITY_FETCH_BY_ID_FAILURE action', () => {
        expect(entityActions.fetchById.failure()).toEqual({
            type: ENTITY_OPERATIONS[FETCH_BY_ID][FAILURE]
        })
    })


    it('entityActions.create.do() should create ENTITY_CREATE_DO action', () => {
        expect(entityActions.create.do({name: 'Author 3', dateOfBirth: '18-01-1990', numberOfBooks: 33})).toEqual({
            type: ENTITY_OPERATIONS[CREATE][DO],
            data: {
                name: 'Author 3',
                dateOfBirth: '18-01-1990',
                numberOfBooks: 33
            }
        })
    })

    it('entityActions.create.request() should create ENTITY_CREATE_REQUEST action', () => {
        expect(entityActions.create.request()).toEqual({
            type: ENTITY_OPERATIONS[CREATE][REQUEST]
        })
    })

    it('entityActions.create.success() should create ENTITY_CREATE_SUCCESS action', () => {
        expect(entityActions.create.success()).toEqual({
            type: ENTITY_OPERATIONS[CREATE][SUCCESS]
        })
    })

    it('entityActions.create.failure() should create ENTITY_CREATE_FAILURE action', () => {
        expect(entityActions.create.failure()).toEqual({
            type: ENTITY_OPERATIONS[CREATE][FAILURE]
        })
    })



})
