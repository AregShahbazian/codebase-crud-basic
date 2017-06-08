import authors from './authors'
import * as actions from '../actions/index'

const initialState = authors(undefined, {}).present;

describe('authors reducer', () => {
    it('should handle initial state', () => {
        expect(
            initialState
        ).toEqual([{id: 1, name: 'Author 1'}, {id: 2, name: 'Author 2'}])
    })

    it('should add author to initial state', () => {
        expect(
            authors(initialState, actions.addAuthor('Author 3')).present
        ).toEqual([...initialState, {id: 3, name: 'Author 3'}])
    })
})