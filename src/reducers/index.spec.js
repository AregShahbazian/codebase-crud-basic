import {deleteEntityFromState, mergeEntityIntoState, prepareEntityForm, replaceStateWithEntities} from "./index";

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
    it("should add new entity to state immutably", () => {
        let added = mergeEntityIntoState(myEntityState12, myEntity3)

        expect(added).toEqual({
            entities: {
                myEntities: {
                    "1": object1,
                    "2": object2,
                    "3": object3
                }
            },
            result: [1, 2, 3]
        })

        expect(added.result).not.toBe(myEntityState12.result)
        expect(added.entities.myEntities).not.toBe(myEntityState12.entities.myEntities)
    })

    let updated = mergeEntityIntoState(myEntityState12, myEntity2Changed)

    it("should update existing entity in state", () => {
        expect(updated).toEqual({
            entities: {
                myEntities: {
                    "1": object1,
                    "2": object2Changed
                }
            },
            result: [1, 2]
        })

        expect(updated.result).not.toBe(myEntityState12.result)
        expect(updated.entities).not.toBe(myEntityState12.entities.myEntities)
    })

})


describe('deleteEntityFromState', () => {
    let deleted = deleteEntityFromState(myEntityState12, myEntity2)

    it("should delete existing entity from state immutably", () => {
        expect(deleted.result).toEqual([1])
        expect(deleted.result).not.toBe(myEntityState12.result)
    })

    let notDeleted = deleteEntityFromState(myEntityState12, myEntity3)

    it("should leave state untouched for deleting non-existing entity", () => {
        expect(notDeleted).toEqual(myEntityState12)
    })

})


describe('replaceStateWithEntities', () => {
    let replaced = replaceStateWithEntities(myEntityState12, {
        entities: {
            myEntities: {
                "1": object1,
                "2": object2
            }
        },
        result: [1, 2]
    })


    it("should replace entities and result in state immutably", () => {
        expect(replaced).toEqual({
            entities: {
                myEntities: {
                    "1": object1,
                    "2": object2
                }
            },
            result: [1, 2]
        })

        expect(replaced.entities).not.toBe(myEntityState12.entities)
        expect(replaced.result).not.toBe(myEntityState12.result)
    })

})


describe('prepareEntityForm ', () => {
    let values = undefined

    let valuesState = {
        values
    }

    let prepared = prepareEntityForm(valuesState, object1)

    it("should replace values state immutably", () => {
        expect(prepared.values).toEqual(object1)
        expect(prepared.values).not.toBe(values)
    })
})





