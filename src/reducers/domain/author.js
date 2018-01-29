import config from "react-global-configuration";
import {entityReducer} from "../index";
import routines from "../../actions/domain";

export default entityReducer(routines.AUTHOR, config.get("entities")[0].initialState)