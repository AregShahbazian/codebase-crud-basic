import {actionCreators} from "../../actions/domain";
import {handleAction} from "redux-actions";

export default handleAction(actionCreators.author.fetchAll.success, (state, action) => (action.payload), {entities: {data: {}}});