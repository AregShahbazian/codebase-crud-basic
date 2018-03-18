import {normalize, schema} from "normalizr";
import config from "react-global-configuration";

const publisher = "publisher";
const publisherSchema = new schema.Entity(publisher)
const publisherInitialState = {...normalize([], new schema.Array(publisherSchema)), workspace: {editing: null}}

const book = "book";
const bookSchema = new schema.Entity(book)
const bookInitialState = {...normalize([], new schema.Array(bookSchema)), workspace: {editing: null}}

const author = "author";
const authorSchema = new schema.Entity('author', {
    publisher: publisherSchema,
    books: [bookSchema]
})
const authorInitialState = {...normalize([], new schema.Array(authorSchema)), workspace: {editing: null}}

config.set({
    entities: [
        {
            entityName: publisher,
            endpoint: "publisher",
            routineName: "PUBLISHER",
            schema: publisherSchema,
            initialState: publisherInitialState
        },
        {
            entityName: book,
            endpoint: "book",
            routineName: "BOOK",
            schema: bookSchema,
            initialState: bookInitialState
        },
        {
            entityName: author,
            endpoint: "author",
            routineName: "AUTHOR",
            schema: authorSchema,
            initialState: authorInitialState
        }
    ],
    apiRoot: "http://localhost:9999/"
})
