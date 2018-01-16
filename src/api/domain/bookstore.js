import config from 'react-global-configuration'
import {schema} from "normalizr";
import {callApi, DELETE, GET, PATCH, POST, PUT} from "../index";

/******************************* AUTHOR *************************************/
const authorEndpoint = config.get("entities").author.endpoint;

const authorSchema = config.get("entities").author.schema
const authorSchemaArray = new schema.Array(authorSchema);

export const fetchAuthors = callApi.bind(null, authorEndpoint, authorSchemaArray, GET)
export const fetchAuthorById = callApi.bind(null, authorEndpoint, authorSchema, GET)
export const searchAuthor = callApi.bind(null, authorEndpoint, authorSchema, GET)
export const createAuthor = callApi.bind(null, authorEndpoint, authorSchema, POST)
export const replaceAuthor = callApi.bind(null, authorEndpoint, authorSchema, PUT)
export const updateAuthor = callApi.bind(null, authorEndpoint, authorSchema, PATCH)
export const deleteAuthor = callApi.bind(null, authorEndpoint, authorSchema, DELETE)


/******************************* BOOK *************************************/
const bookEndpoint = config.get("entities").book.endpoint;

const bookSchema = config.get("entities").book.schema
const bookSchemaArray = new schema.Array(bookSchema);

export const fetchBooks = callApi.bind(null, bookEndpoint, bookSchemaArray, GET)
export const fetchBookById = callApi.bind(null, bookEndpoint, bookSchema, GET)
export const searchBook = callApi.bind(null, bookEndpoint, bookSchema, GET)
export const createBook = callApi.bind(null, bookEndpoint, bookSchema, POST)
export const replaceBook = callApi.bind(null, bookEndpoint, bookSchema, PUT)
export const updateBook = callApi.bind(null, bookEndpoint, bookSchema, PATCH)
export const deleteBook = callApi.bind(null, bookEndpoint, bookSchema, DELETE)

export const api = {
    author: {
        fetchAll: callApi.bind(null, authorEndpoint, authorSchemaArray, GET),
        fetchById: callApi.bind(null, authorEndpoint, authorSchema, GET),
        search: callApi.bind(null, authorEndpoint, authorSchema, GET),
        create: callApi.bind(null, authorEndpoint, authorSchema, POST),
        replace: callApi.bind(null, authorEndpoint, authorSchema, PUT),
        update: callApi.bind(null, authorEndpoint, authorSchema, PATCH),
        delete: callApi.bind(null, authorEndpoint, authorSchema, DELETE)
    },
    book: {
        fetchAll: callApi.bind(null, bookEndpoint, bookSchemaArray, GET),
        fetchById: callApi.bind(null, bookEndpoint, bookSchema, GET),
        search: callApi.bind(null, bookEndpoint, bookSchema, GET),
        create: callApi.bind(null, bookEndpoint, bookSchema, POST),
        replace: callApi.bind(null, bookEndpoint, bookSchema, PUT),
        update: callApi.bind(null, bookEndpoint, bookSchema, PATCH),
        delete: callApi.bind(null, bookEndpoint, bookSchema, DELETE)
    }
}

