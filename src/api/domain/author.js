import {schema} from "normalizr";
import {callApi, GET, POST} from "../index";


const authorSchema = new schema.Entity('data')
const authorSchemaArray = {data: new schema.Array(authorSchema)};


export const callApiAuthor = callApi.bind(null, 'author')

export const fetchAuthors = () => callApiAuthor(authorSchemaArray, GET)
export const fetchAuthorById = (payload) => callApiAuthor(authorSchema, GET, payload)
export const createAuthor = (newAuthor) => callApiAuthor(authorSchema, POST, newAuthor)
