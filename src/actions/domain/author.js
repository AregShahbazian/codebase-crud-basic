import config from 'react-global-configuration'
import * as actions from "../index";

export const authorRoutines = actions.entityRoutines([config.get("entities").author.routineName])

