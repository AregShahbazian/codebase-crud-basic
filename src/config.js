import {schema, normalize} from "normalizr";
import config from 'react-global-configuration'

const author = "author";
const authorSchema = new schema.Entity(author)
const authorInitialState = normalize([], new schema.Array(authorSchema))

config.set({
    entities: {
        author: {
            entityName: author,
            endpoint: "author",
            routineName: "AUTHOR",
            schema: authorSchema,
            initialState: authorInitialState
        }
    },
    apiRoot: "http://localhost:9999/"
})
