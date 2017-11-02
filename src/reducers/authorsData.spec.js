import authorsData from "./authorsData";

const initialState = authorsData(undefined, {}).present;

describe('authorsData reducer', () => {
    it('should handle initial state', () => {
        const expectedInitialState = undefined

        expect(
            initialState
        ).toEqual(expectedInitialState)
    })

})