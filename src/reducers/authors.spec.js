import authors from './authors'

describe('authors reducer', () => {
    it('should handle initial state', () =>{
        expect(
            authors(undefined, {}).present
        ).toEqual([{id: 1, name: 'Author 1'}, {id: 2, name: 'Author 2'}])
    })
})