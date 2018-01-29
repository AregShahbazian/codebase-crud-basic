import config from "react-global-configuration";
import {createEntityRoutines} from "../index";

export default createEntityRoutines(config.get("entities"))
