export const findAuthor = (nameFilter, numberOfBooksFilter) => ({
    type: 'SET_AUTHOR_FILTER',
    nameFilter,
    numberOfBooksFilter
})

export const addAuthor = (name, dateOfBirth, numberOfBooks) => ({
    type: 'ADD_AUTHOR',
    name,
    dateOfBirth,
    numberOfBooks
})
