import config from 'react-global-configuration'
import * as actions from "../index";

export const bookstoreRoutines = actions.entityRoutines([
    config.get("entities").author.routineName,
    config.get("entities").book.routineName
])

