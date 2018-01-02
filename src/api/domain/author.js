import {schema} from "normalizr";
import {callApi, DELETE, GET, PATCH, POST, PUT} from "../index";

const authorEndpoint = 'author';

const authorSchema = new schema.Entity('author')
const authorSchemaArray = new schema.Array(authorSchema);

export const fetchAuthors = callApi.bind(null, authorEndpoint, authorSchemaArray, GET)
export const fetchAuthorById = callApi.bind(null, authorEndpoint, authorSchema, GET)
export const searchAuthor = callApi.bind(null, authorEndpoint, authorSchema, GET)
export const createAuthor = callApi.bind(null, authorEndpoint, authorSchema, POST)
export const replaceAuthor = callApi.bind(null, authorEndpoint, authorSchema, PUT)
export const updateAuthor = callApi.bind(null, authorEndpoint, authorSchema, PATCH)
export const deleteAuthor = callApi.bind(null, authorEndpoint, authorSchema, DELETE)
