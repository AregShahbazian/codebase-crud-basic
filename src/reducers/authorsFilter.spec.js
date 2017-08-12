import authorsFilter from './authorsFilter'

describe('authorsFilter reducer', () => {
    it('should handle initial state', () => {
        const actualState = {nameFilter: '', numberOfBooksFilter: 0}
        const expectedState = authorsFilter(undefined, {})

        expect(
            expectedState
        ).toEqual(actualState)
    })

    it('should store authorsFilter in state', () => {
        const actualState = authorsFilter({
            nameFilter: 'au',
            numberOfBooksFilter: 20
        }, 'SET_AUTHOR_FILTER')

        const expectedState = {
            nameFilter: 'au',
            numberOfBooksFilter: 20
        }

        expect(
            actualState
        ).toEqual(
            expectedState
        )
    })
})