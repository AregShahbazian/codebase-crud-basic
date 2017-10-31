import authorsData from './authorsData'
import * as actions from '../actions/index'

const initialState = authorsData(undefined, {}).present;

describe('authorsData reducer', () => {
    it('should handle initial state', () => {
        const expectedInitialState = undefined

        expect(
            initialState
        ).toEqual(expectedInitialState)
    })

})