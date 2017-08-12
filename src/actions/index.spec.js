import * as actions from './index'

describe('authors actions', () => {
    it('findAuthor should create SET_AUTHOR_FILTER action', () => {
        expect(actions.findAuthor('au', 12)).toEqual({
            type: 'SET_AUTHOR_FILTER',
            nameFilter: 'au',
            numberOfBooksFilter: 12
        })
    })

    it('addAuthor should create ADD_AUTHOR action', () => {
        expect(actions.addAuthor('Author 3', '18-01-1990', 33)).toEqual({
            type: 'ADD_AUTHOR',
            name: 'Author 3',
            dateOfBirth: '18-01-1990',
            numberOfBooks: 33
        })
    })

})
