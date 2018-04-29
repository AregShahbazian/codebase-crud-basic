import config from "../../config/index";
import {createDomainRoutines} from "../index";

export default createDomainRoutines(config.entities)
