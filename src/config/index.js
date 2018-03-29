import {normalize, schema} from "normalizr";
import config from "react-global-configuration";

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

const entityConfigs = {}

entityConfigs[publisher] = {
    endpoint: "publisher",
    routineName: "PUBLISHER",
    schema:
    publisherSchema,
    initialState:
    publisherInitialState
}

entityConfigs[book] = {
    endpoint: "book",
    routineName: "BOOK",
    schema:
    bookSchema,
    initialState:
    bookInitialState
}

entityConfigs[author] = {
    endpoint: "author",
    routineName: "AUTHOR",
    schema:
    authorSchema,
    initialState:
    authorInitialState
}

config.set({
    entities: entityConfigs,
    apiRoot: "http://localhost:9999/"
})
