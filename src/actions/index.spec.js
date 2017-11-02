import {
    CREATE,
    createOperationTypes,
    DO,
    entityActions,
    FAILURE,
    FETCH_ALL,
    FETCH_BY_ID,
    REQUEST,
    SUCCESS
} from "./index";


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

    const OPERATIONS = createOperationTypes('ENTITY')
    const actions = entityActions(OPERATIONS)


    it('entityActions.fetchAll.do() should create ENTITY_FETCH_ALL_DO action', () => {
        expect(actions.fetchAll.do()).toEqual({
            type: OPERATIONS[FETCH_ALL][DO]
        })
    })

    it('entityActions.fetchAll.request() should create ENTITY_FETCH_ALL_REQUEST action', () => {
        expect(actions.fetchAll.request()).toEqual({
            type: OPERATIONS[FETCH_ALL][REQUEST]
        })
    })

    it('entityActions.fetchAll.success() should create ENTITY_FETCH_ALL_SUCCESS action', () => {
        expect(actions.fetchAll.success()).toEqual({
            type: OPERATIONS[FETCH_ALL][SUCCESS]
        })
    })

    it('entityActions.fetchAll.failure() should create ENTITY_FETCH_ALL_FAILURE action', () => {
        expect(actions.fetchAll.failure()).toEqual({
            type: OPERATIONS[FETCH_ALL][FAILURE]
        })
    })


    it('entityActions.fetchById.do() should create ENTITY_FETCH_ALL_DO action', () => {
        expect(actions.fetchById.do()).toEqual({
            type: OPERATIONS[FETCH_BY_ID][DO]
        })
    })

    it('entityActions.fetchById.request() should create ENTITY_FETCH_BY_ID_REQUEST action', () => {
        expect(actions.fetchById.request()).toEqual({
            type: OPERATIONS[FETCH_BY_ID][REQUEST]
        })
    })

    it('entityActions.fetchById.success() should create ENTITY_FETCH_BY_ID_SUCCESS action', () => {
        expect(actions.fetchById.success()).toEqual({
            type: OPERATIONS[FETCH_BY_ID][SUCCESS]
        })
    })

    it('entityActions.fetchById.failure() should create ENTITY_FETCH_BY_ID_FAILURE action', () => {
        expect(actions.fetchById.failure()).toEqual({
            type: OPERATIONS[FETCH_BY_ID][FAILURE]
        })
    })


    it('entityActions.create.do() should create ENTITY_CREATE_DO action', () => {
        expect(actions.create.do({name: 'Author 3', dateOfBirth: '18-01-1990', numberOfBooks: 33})).toEqual({
            type: OPERATIONS[CREATE][DO],
            data: {
                name: 'Author 3',
                dateOfBirth: '18-01-1990',
                numberOfBooks: 33
            }
        })
    })

    it('entityActions.create.request() should create ENTITY_CREATE_REQUEST action', () => {
        expect(actions.create.request()).toEqual({
            type: OPERATIONS[CREATE][REQUEST]
        })
    })

    it('entityActions.create.success() should create ENTITY_CREATE_SUCCESS action', () => {
        expect(actions.create.success()).toEqual({
            type: OPERATIONS[CREATE][SUCCESS]
        })
    })

    it('entityActions.create.failure() should create ENTITY_CREATE_FAILURE action', () => {
        expect(actions.create.failure()).toEqual({
            type: OPERATIONS[CREATE][FAILURE]
        })
    })


})
