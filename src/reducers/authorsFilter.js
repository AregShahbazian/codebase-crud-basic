const initialAuthorsFilter = {nameFilter: '', numberOfBooksFilter: 0}

const authorsFilter = (state = initialAuthorsFilter, action) => {
    switch (action.type) {
        case 'SET_AUTHOR_FILTER':
            return {
                nameFilter: action.nameFilter,
                numberOfBooksFilter:
                    isNaN(parseInt(action.numberOfBooksFilter)) ? 0 : parseInt(action.numberOfBooksFilter)
            }
        default:
            return state
    }
}

export default authorsFilter
