import * as actions from '.'

describe('authors actions', () => {

    it('addAuthor should create ADD_AUTHOR action', () => {
        expect(actions.addAuthor('Author 3', '18-01-1990', 33)).toEqual({
            type: actions.ADD_AUTHOR,
            name: 'Author 3',
            dateOfBirth: '18-01-1990',
            numberOfBooks: 33
        })
    })

    it('fetchAuthors should create FETCH_AUTHOR action', () => {
        expect(actions.fetchAuthors()).toEqual({
            type: actions.FETCH_AUTHORS,
        })
    })

})
