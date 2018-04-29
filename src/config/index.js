import {normalize, schema} from "normalizr";

const tableInitialState = {
    pages: 1,
    loading: true
}

const publisher = "publisher";
const publisherSchema = new schema.Entity(publisher)
const publisherInitialState = {...normalize([], new schema.Array(publisherSchema)), ...tableInitialState}

const book = "book";
const bookSchema = new schema.Entity(book)
const bookInitialState = {...normalize([], new schema.Array(bookSchema)), ...tableInitialState}

const author = "author";
const authorSchema = new schema.Entity('author', {
    publisher: publisherSchema,
    books: [bookSchema]
})
const authorInitialState = {...normalize([], new schema.Array(authorSchema)), ...tableInitialState}

const entities = {}

entities[publisher] = {
    endpoint: "publisher",
    routineName: "PUBLISHER",
    schema:
    publisherSchema,
    initialState:
    publisherInitialState
}

entities[book] = {
    endpoint: "book",
    routineName: "BOOK",
    schema:
    bookSchema,
    initialState:
    bookInitialState
}

entities[author] = {
    endpoint: "author",
    routineName: "AUTHOR",
    schema:
    authorSchema,
    initialState:
    authorInitialState
}

export default {
    entities,
    apiRoot: "http://localhost:9999"
}

