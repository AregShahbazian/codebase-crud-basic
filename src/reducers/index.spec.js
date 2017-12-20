import {createOperationTypes, entityActions,entityActionCreators} from "../actions";
import {entityReducer} from "./index"

const OPERATIONS = createOperationTypes('ENTITY')
const actions = entityActions(OPERATIONS)

describe('entity reducer', () => {
    const actionCreators = entityActionCreators(["ENTITY"])

    const INITIAL_STATE = "INITIAL STATE"
    const initialState = entityReducer({OPERATIONS})(INITIAL_STATE, {});

    const PAYLOAD = "ENTITY OPERATION RESPONSE"

    it('should handle initial state with empty action', () => {
        const expectedInitialState = INITIAL_STATE
        expect(
            initialState
        ).toEqual(expectedInitialState)
    })

    it('should handle fetchAll.success action and replace state with the action payload', () => {
        expect(
            entityReducer({OPERATIONS})(undefined, actions.fetchAll.success(PAYLOAD))
        ).toEqual(PAYLOAD)
    })

})
