import config from "react-global-configuration";
import {createDomainApiFunctions} from "../index";

export default createDomainApiFunctions(config.get("entities"))
