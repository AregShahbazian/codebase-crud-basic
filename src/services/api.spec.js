import api from '../services'

describe('api', () => {

    it('createOperationTypes should create operation types', () => {
        expect(api.createOperationTypes('ENTITY')).toEqual({
            "FETCH_ALL": {
                "REQUEST": "ENTITY_FETCH_ALL_REQUEST",
                "SUCCESS": "ENTITY_FETCH_ALL_SUCCESS",
                "FAILURE": "ENTITY_FETCH_ALL_FAILURE",
            },
            "FETCH_BY_ID": {
                "REQUEST": "ENTITY_FETCH_BY_ID_REQUEST",
                "SUCCESS": "ENTITY_FETCH_BY_ID_SUCCESS",
                "FAILURE": "ENTITY_FETCH_BY_ID_FAILURE",
            },
            "CREATE": {
                "REQUEST": "ENTITY_CREATE_REQUEST",
                "SUCCESS": "ENTITY_CREATE_SUCCESS",
                "FAILURE": "ENTITY_CREATE_FAILURE",
            },
        })
    })

})
