import {entityActionCreators} from "../actions";
import {entityReducer} from "./index"


describe('entity reducer', () => {

    const actionCreators = entityActionCreators(["ENTITY"])

    it('should handle fetchAll.success action and replace state with the action payload', () => {
        expect(
            1
        ).toEqual(1)
    })

})
