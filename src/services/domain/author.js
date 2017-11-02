import { schema} from 'normalizr'
import api from '../index'

const {GET, POST, PUT, PATCH, DELETE, callApi} = api


const authorSchema = new schema.Entity('data')
const authorSchemaArray = {data: new schema.Array(authorSchema)};

export const fetchAuthors = () => callApi('author', authorSchemaArray)
export const fetchAuthorById = (id) => callApi('author', authorSchema, GET, id)
export const createAuthor = (newAuthor) => callApi('author', authorSchema, POST, newAuthor)


