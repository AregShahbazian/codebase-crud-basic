import config from "react-global-configuration";
import {createApiFunctions} from "../index";

export const api = createApiFunctions(config.get("entities"))
