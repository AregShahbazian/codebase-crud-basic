import {normalize,schema} from "normalizr";
import {entityReducer} from "../index";
import {routines} from "../../actions/domain";

const initialState = {entities: {authors: {}}, result: []};

const authorSchema = new schema.Entity('authors')

const foo = normalize([],new schema.Array(schema))

export default entityReducer(routines.AUTHOR, foo)