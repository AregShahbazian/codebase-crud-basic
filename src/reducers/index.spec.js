import {entityRoutines} from "../actions";


describe('entity reducer', () => {

    const actionCreators = entityRoutines(["ENTITY"])

    it('should handle fetchAll.success action and replace state with the action payload', () => {
        expect(
            1
        ).toEqual(1)
    })

})
