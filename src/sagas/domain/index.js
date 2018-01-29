import config from "react-global-configuration";
import {createRootSaga} from "../index";
import routines from "../../actions/domain";
import api from "../../api/domain";

export default createRootSaga.bind(null, config.get("entities"), routines, api)