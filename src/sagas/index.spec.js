import {all, call, fork, put, takeLatest} from "redux-saga/effects";
import * as foo from "./index"


describe('doFetchAuthors', () => {
    it('should fetch author', () => {
        const gen = foo.doFetchAuthors()

        expect(
            gen.next().value
        ).toEqual(call(foo.fetchAuthors))
    })

})