import config from "../../config/index";
import {createDomainApiFunctions} from "../index";

export default createDomainApiFunctions(config.entities)
