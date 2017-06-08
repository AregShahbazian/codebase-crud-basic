import * as actions from './index'

describe('todo actions', () => {
    it('findAuthor should create FIND_AUTHOR action', () => {
        expect(actions.findAuthor('au')).toEqual({
            type: 'FIND_AUTHOR',
            nameFilter: 'au'
        })
    })

    it('addAuthor should create ADD_AUTHOR action', () => {
        expect(actions.addAuthor('Author 3')).toEqual({
            type: 'ADD_AUTHOR',
            name: 'Author 3'
        })
    })

})
