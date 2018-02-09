import "../config/index";
import {normalize, schema} from "normalizr";
import {createDomainApiFunctions, createRequest, DELETE, GET, normalizeData, PATCH, POST, PUT} from "./index";


describe('createRequest', () => {

    it("should create correct GET requests", () => {
        expect(createRequest("myEntity", GET, {}, undefined)).toEqual({
            fullEndpoint: "myEntity",
            requestBody: undefined
        })
        expect(createRequest("myEntity", GET, {foo: "Foo", bar: "Bar"}, undefined)).toEqual({
            fullEndpoint: "myEntity?foo=Foo&bar=Bar",
            requestBody: undefined
        })
        expect(createRequest("myEntity", GET, {}, 1)).toEqual({
            fullEndpoint: "myEntity/1",
            requestBody: undefined
        })
        expect(createRequest("myEntity", GET, {foo: "Foo", bar: "Bar"}, 1)).toEqual({
            fullEndpoint: "myEntity/1?foo=Foo&bar=Bar",
            requestBody: undefined
        })
    })

    it("should create correct POST requests", () => {
        expect(createRequest("myEntity", POST, {}, undefined)).toEqual({
            fullEndpoint: "myEntity",
            requestBody: {}
        })
        expect(createRequest("myEntity", POST, {foo: "Foo", bar: "Bar"}, undefined)).toEqual({
            fullEndpoint: "myEntity",
            requestBody: {foo: "Foo", bar: "Bar"}
        })
        expect(createRequest("myEntity", POST, {}, 1)).toEqual({
            fullEndpoint: "myEntity",
            requestBody: {}
        })
        expect(createRequest("myEntity", POST, {foo: "Foo", bar: "Bar"}, 1)).toEqual({
            fullEndpoint: "myEntity",
            requestBody: {foo: "Foo", bar: "Bar"}
        })
    })

    it("should create correct PUT requests", () => {
        expect(createRequest("myEntity", PUT, {}, undefined)).toEqual({
            fullEndpoint: "myEntity",
            requestBody: {}
        })
        expect(createRequest("myEntity", PUT, {foo: "Foo", bar: "Bar"}, undefined)).toEqual({
            fullEndpoint: "myEntity",
            requestBody: {foo: "Foo", bar: "Bar"}
        })
        expect(createRequest("myEntity", PUT, {}, 1)).toEqual({
            fullEndpoint: "myEntity/1",
            requestBody: {}
        })
        expect(createRequest("myEntity", PUT, {foo: "Foo", bar: "Bar"}, 1)).toEqual({
            fullEndpoint: "myEntity/1",
            requestBody: {foo: "Foo", bar: "Bar"}
        })
    })

    it("should create correct PATCH requests", () => {
        expect(createRequest("myEntity", PATCH, {}, undefined)).toEqual({
            fullEndpoint: "myEntity",
            requestBody: {}
        })
        expect(createRequest("myEntity", PATCH, {foo: "Foo", bar: "Bar"}, undefined)).toEqual({
            fullEndpoint: "myEntity",
            requestBody: {foo: "Foo", bar: "Bar"}
        })
        expect(createRequest("myEntity", PATCH, {}, 1)).toEqual({
            fullEndpoint: "myEntity/1",
            requestBody: {}
        })
        expect(createRequest("myEntity", PATCH, {foo: "Foo", bar: "Bar"}, 1)).toEqual({
            fullEndpoint: "myEntity/1",
            requestBody: {foo: "Foo", bar: "Bar"}
        })
    })

    it("should create correct DELETE requests", () => {
        expect(createRequest("myEntity", DELETE, {}, undefined)).toEqual({
            fullEndpoint: "myEntity",
            requestBody: undefined
        })
        expect(createRequest("myEntity", DELETE, {foo: "Foo", bar: "Bar"}, undefined)).toEqual({
            fullEndpoint: "myEntity?foo=Foo&bar=Bar",
            requestBody: undefined
        })
        expect(createRequest("myEntity", DELETE, {}, 1)).toEqual({
            fullEndpoint: "myEntity/1",
            requestBody: undefined
        })
        expect(createRequest("myEntity", DELETE, {foo: "Foo", bar: "Bar"}, 1)).toEqual({
            fullEndpoint: "myEntity/1?foo=Foo&bar=Bar",
            requestBody: undefined
        })
    })


})

describe('normalizeData', () => {

    const authorData = {
        name: "myAuthor",
        publisher: {
            id: 11,
            name: "myPublisher"
        },
        bookList: [
            {
                id: 111,
                name: "myBook1"
            },
            {
                id: 222,
                name: "myBook1"
            }
        ]
    }

    const publisherSchema = new schema.Entity('publisher')
    const bookSchema = new schema.Entity('book')
    const authorSchema = new schema.Entity('author', {
        publisher: publisherSchema,
        bookList: [bookSchema]
    })


    it("should normalize single entity response correctly", () => {
        expect(normalizeData(authorSchema, {id: 1, ...authorData})).toEqual({
            entities: {
                author: {
                    1: {
                        id: 1,
                        bookList: [111, 222],
                        name: "myAuthor",
                        publisher: 11
                    }
                },
                publisher: {
                    11: {
                        id: 11,
                        name: "myPublisher"
                    }
                },
                book: {
                    111: {
                        id: 111,
                        name: "myBook1"
                    },
                    222: {
                        id: 222,
                        name: "myBook1"
                    }
                }
            }, result: 1
        })
    })

    const authorSchemaArray = new schema.Array(authorSchema)

    it("should normalize multiple entity response correctly", () => {
        expect(normalizeData(authorSchemaArray, [{id: 1, ...authorData}, {id: 2, ...authorData}])).toEqual({
            entities: {
                author: {
                    1: {
                        id: 1,
                        bookList: [111, 222],
                        name: "myAuthor",
                        publisher: 11
                    },
                    2: {
                        id: 2,
                        bookList: [111, 222],
                        name: "myAuthor",
                        publisher: 11
                    }
                },
                publisher: {
                    11: {
                        id: 11,
                        name: "myPublisher"
                    }
                },
                book: {
                    111: {
                        id: 111,
                        name: "myBook1"
                    },
                    222: {
                        id: 222,
                        name: "myBook1"
                    }
                }
            }, result: [1, 2]
        })
    })

})

describe('createDomainApiFunctions', () => {

    const myEntity1 = "myEntity1";
    const myEntity1Schema = new schema.Entity(myEntity1)
    const myEntity1InitialState = normalize([], new schema.Array(myEntity1Schema))

    const myEntity1Config = {
        entityName: myEntity1,
        endpoint: "myEntity1",
        routineName: "MY_ENTITY1",
        schema: myEntity1Schema,
        initialState: myEntity1InitialState
    }

    const myEntity2 = "myEntity2";
    const myEntity2Schema = new schema.Entity(myEntity2)
    const myEntity2InitialState = normalize([], new schema.Array(myEntity2Schema))

    const myEntity2Config = {
        entityName: myEntity2,
        endpoint: "myEntity2",
        routineName: "MY_ENTITY2",
        schema: myEntity2Schema,
        initialState: myEntity2InitialState
    }

    const domainConfigs = [myEntity1Config, myEntity2Config]

    const a = ["fetchAll", "fetchById", "search", "create", "replace", "update", "delete"]
    const apiFunctions = createDomainApiFunctions(domainConfigs)

    a.forEach((a) => {
        it(`should create api function for ${a}, for each entity using configuration object`, () => {
            expect(apiFunctions.myEntity1[a].name).toEqual("bound callApi")
        })
    })


})


