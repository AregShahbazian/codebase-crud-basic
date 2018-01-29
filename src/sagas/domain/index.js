import config from "react-global-configuration";
import {rootSaga} from "../index";
import routines from "../../actions/domain";
import api from "../../api/domain";

export default rootSaga.bind(null, config.get("entities"), routines, api)