import authorsData from './authorsData'
import * as actions from '../actions/index'

const initialState = authorsData(undefined, {}).present;

describe('authorsData reducer', () => {
    it('should handle initial state', () => {
        const expectedInitialState = []

        expect(
            initialState
        ).toEqual(expectedInitialState)
    })

    it('should add author to initial state', () => {
        const actualState = [...initialState, {id: 3, name: 'Author 3', dateOfBirth: '03-03-1993', numberOfBooks: 33}]
        const expectedState = authorsData(initialState, actions.addAuthor('Author 3', '03-03-1993', 33)).present

        expect(
            expectedState,
        ).toEqual(actualState)
    })
})