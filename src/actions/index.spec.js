import * as actions from './index'

describe('authors actions', () => {

    it('createAuthor should create CREATE_AUTHOR action', () => {
        expect(actions.author.create.do({name: 'Author 3', dateOfBirth: '18-01-1990', numberOfBooks: 33})).toEqual({
            type: actions.CREATE_AUTHOR,
            data: {
                name: 'Author 3',
                dateOfBirth: '18-01-1990',
                numberOfBooks: 33
            }
        })
    })

    it('fetchAuthors should create LOAD_AUTHOR action', () => {
        expect(actions.author.fetchAll.do()).toEqual({
            type: actions.FETCH_AUTHORS,
        })
    })

})
