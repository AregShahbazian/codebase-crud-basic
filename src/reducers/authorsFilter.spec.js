import authorsFilter from './authorsFilter'

describe('authorsFilter reducer', () => {
    it('should handle initial state', () =>{
        expect(
            authorsFilter(undefined, {})
        ).toEqual('')
    })

    it('should store authorsFilter in state', () =>{
        expect(
            authorsFilter('au', 'FIND_AUTHOR')
        ).toEqual('au')
    })
})