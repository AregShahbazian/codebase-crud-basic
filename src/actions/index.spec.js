import * as actions from './index'

describe('todo actions', () => {
    it('addTodo should create ADD_TODO action', () => {
        expect(actions.findAuthor('au')).toEqual({
            type: 'FIND_AUTHOR',
            nameFilter: 'au'
        })
    })

})
