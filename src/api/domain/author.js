import {schema} from "normalizr";
import {callApi, GET, POST} from "../index";

const authorEndpoint = 'author';

const authorSchema = new schema.Entity('data')
const authorSchemaArray = {data: new schema.Array(authorSchema)};

export const fetchAuthors = callApi.bind(null, authorEndpoint, authorSchemaArray, GET)
export const fetchAuthorById = callApi.bind(null, authorEndpoint, authorSchema, GET)
export const createAuthor = callApi.bind(null, authorEndpoint, authorSchema, POST)
