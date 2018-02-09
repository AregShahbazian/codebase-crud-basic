import {getAuthorsWithNumberOfBooks} from "./ResultsAuthorTable"

describe('createDomainApiFunctions', () => {

    it("should create correct GET requests", () => {
        expect(getAuthorsWithNumberOfBooks( {})).toEqual({

        })
    })

})
