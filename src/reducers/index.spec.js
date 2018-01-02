import {deleteEntityFromState, mergeEntityIntoState} from "./index";

const object1 = {id: 1, foo: "Foo1", bar: "Bar1"}
const object2 = {id: 2, foo: "Foo2", bar: "Bar2"}
const object2Changed = {id: 2, foo: "Foo2 CHANGED", bar: "Bar2 CHANGED"}
const object3 = {id: 3, foo: "Foo3", bar: "Bar3"}

const myEntityState12 = {
    entities: {
        myEntities: {
            "1": object1,
            "2": object2
        }
    },
    result: [1, 2]
}

const myEntity2 = {
    entities: {
        myEntities: {
            "2": object2
        }
    },
    result: 2
}

const myEntity2Changed = {
    entities: {
        myEntities: {
            "2": object2Changed
        }
    },
    result: 2
}

const myEntity3 = {
    entities: {
        myEntities: {
            "3": object3
        }
    },
    result: 3
}


describe('mergeEntityIntoState', () => {
    it("should add new entity to state", () => {
        expect(mergeEntityIntoState(myEntityState12, myEntity3)).toEqual({
            entities: {
                myEntities: {
                    "1": object1,
                    "2": object2,
                    "3": object3
                }
            },
            result: [1, 2, 3]
        })
    })

    it("should update existing entity in state", () => {
        expect(mergeEntityIntoState(myEntityState12, myEntity2Changed)).toEqual({
            entities: {
                myEntities: {
                    "1": object1,
                    "2": object2Changed
                }
            },
            result: [1, 2]
        })
    })

})


describe('deleteEntityFromState', () => {
    it("should delete existing entity from state", () => {
        expect(deleteEntityFromState(myEntityState12, myEntity2)).toEqual({
            entities: {
                myEntities: {
                    "1": object1,
                    "2": object2
                }
            },
            result: [1]
        })
    })

    it("should leave state untouched for deleting non-existing entity", () => {
        expect(deleteEntityFromState(myEntityState12, myEntity3)).toEqual(myEntityState12)
    })

})




