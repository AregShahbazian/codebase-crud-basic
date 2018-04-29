import config from "../../config/index";
import {createRootSaga} from "../index";
import routines from "../../actions/domain";
import api from "../../api/domain";

export default createRootSaga.bind(null, config.entities, routines, api)