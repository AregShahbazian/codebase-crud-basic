import config from "react-global-configuration";
import {createApiFunctions} from "../index";

export default createApiFunctions(config.get("entities"))
