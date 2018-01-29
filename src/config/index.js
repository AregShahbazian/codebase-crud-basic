import {normalize, schema} from "normalizr";
import config from "react-global-configuration";

const author = "author";
const authorSchema = new schema.Entity(author)
const authorInitialState = normalize([], new schema.Array(authorSchema))

const book = "book";
const bookSchema = new schema.Entity(book)
const bookInitialState = normalize([], new schema.Array(bookSchema))

config.set({
    entities: [
        {
            entityName: author,
            endpoint: "author",
            routineName: "AUTHOR",
            schema: authorSchema,
            initialState: authorInitialState
        },
        {
            entityName: book,
            endpoint: "book",
            routineName: "BOOK",
            schema: bookSchema,
            initialState: bookInitialState
        }
    ],
    apiRoot: "http://localhost:9999/"
})
