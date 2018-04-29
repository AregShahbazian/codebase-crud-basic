import config from "../../config/index";
import {createDomainReducers} from "../index";
import routines from "../../actions/domain";


export default createDomainReducers(config.entities, routines)
