const authorsFilter = (state = '', action) => {
    switch (action.type) {
        case 'FIND_AUTHOR':
            return action.nameFilter
        default:
            return state
    }
}

export default authorsFilter
