import config from "react-global-configuration";
import {createDomainRoutines} from "../index";

export default createDomainRoutines(config.get("entities"))
