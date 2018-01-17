import config from "react-global-configuration";
import {createEntityRoutines} from "../index";

export const routines = createEntityRoutines(config.get("entities"))
