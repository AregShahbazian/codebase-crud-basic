import config from "react-global-configuration";
import {createDomainReducers} from "../index";
import routines from "../../actions/domain";


export default createDomainReducers(config.get("entities"), routines)
