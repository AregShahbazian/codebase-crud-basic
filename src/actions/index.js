export const findAuthor = (nameFilter) => ({
    type: 'FIND_AUTHOR',
    nameFilter
})

export const addAuthor = (name) => ({
    type: 'ADD_AUTHOR',
    name
})
