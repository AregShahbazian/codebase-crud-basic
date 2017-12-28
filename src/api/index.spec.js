import {schema} from "normalizr";
import {createRequest, DELETE, GET, normalizeData, PATCH, POST, PUT} from "./index";

describe('createRequest', () => {

    it("should create correct GET requests", () => {
        expect(createRequest("entity", GET, {}, undefined)).toEqual({
            fullEndpoint: "entity",
            requestBody: undefined
        })
        expect(createRequest("entity", GET, {foo: "Foo", bar: "Bar"}, undefined)).toEqual({
            fullEndpoint: "entity?foo=Foo&bar=Bar",
            requestBody: undefined
        })
        expect(createRequest("entity", GET, {}, 1)).toEqual({
            fullEndpoint: "entity/1",
            requestBody: undefined
        })
        expect(createRequest("entity", GET, {foo: "Foo", bar: "Bar"}, 1)).toEqual({
            fullEndpoint: "entity/1?foo=Foo&bar=Bar",
            requestBody: undefined
        })
    })

    it("should create correct POST requests", () => {
        expect(createRequest("entity", POST, {}, undefined)).toEqual({
            fullEndpoint: "entity",
            requestBody: {}
        })
        expect(createRequest("entity", POST, {foo: "Foo", bar: "Bar"}, undefined)).toEqual({
            fullEndpoint: "entity",
            requestBody: {foo: "Foo", bar: "Bar"}
        })
        expect(createRequest("entity", POST, {}, 1)).toEqual({
            fullEndpoint: "entity",
            requestBody: {}
        })
        expect(createRequest("entity", POST, {foo: "Foo", bar: "Bar"}, 1)).toEqual({
            fullEndpoint: "entity",
            requestBody: {foo: "Foo", bar: "Bar"}
        })
    })

    it("should create correct PUT requests", () => {
        expect(createRequest("entity", PUT, {}, undefined)).toEqual({
            fullEndpoint: "entity",
            requestBody: {}
        })
        expect(createRequest("entity", PUT, {foo: "Foo", bar: "Bar"}, undefined)).toEqual({
            fullEndpoint: "entity",
            requestBody: {foo: "Foo", bar: "Bar"}
        })
        expect(createRequest("entity", PUT, {}, 1)).toEqual({
            fullEndpoint: "entity/1",
            requestBody: {}
        })
        expect(createRequest("entity", PUT, {foo: "Foo", bar: "Bar"}, 1)).toEqual({
            fullEndpoint: "entity/1",
            requestBody: {foo: "Foo", bar: "Bar"}
        })
    })

    it("should create correct PATCH requests", () => {
        expect(createRequest("entity", PATCH, {}, undefined)).toEqual({
            fullEndpoint: "entity",
            requestBody: {}
        })
        expect(createRequest("entity", PATCH, {foo: "Foo", bar: "Bar"}, undefined)).toEqual({
            fullEndpoint: "entity",
            requestBody: {foo: "Foo", bar: "Bar"}
        })
        expect(createRequest("entity", PATCH, {}, 1)).toEqual({
            fullEndpoint: "entity/1",
            requestBody: {}
        })
        expect(createRequest("entity", PATCH, {foo: "Foo", bar: "Bar"}, 1)).toEqual({
            fullEndpoint: "entity/1",
            requestBody: {foo: "Foo", bar: "Bar"}
        })
    })

    it("should create correct DELETE requests", () => {
        expect(createRequest("entity", DELETE, {}, undefined)).toEqual({
            fullEndpoint: "entity",
            requestBody: undefined
        })
        expect(createRequest("entity", DELETE, {foo: "Foo", bar: "Bar"}, undefined)).toEqual({
            fullEndpoint: "entity?foo=Foo&bar=Bar",
            requestBody: undefined
        })
        expect(createRequest("entity", DELETE, {}, 1)).toEqual({
            fullEndpoint: "entity/1",
            requestBody: undefined
        })
        expect(createRequest("entity", DELETE, {foo: "Foo", bar: "Bar"}, 1)).toEqual({
            fullEndpoint: "entity/1?foo=Foo&bar=Bar",
            requestBody: undefined
        })
    })


})

describe('normalizeData should normalize data', () => {
    const data =
        {
            "id": 1,
            "field1": "Value 1",
            "field2": "Value 2"
        }

    const dataArray =
        [
            {
                "id": 1,
                "field1": "Value 1",
                "field2": "Value 2"
            },
            {
                "id": 2,
                "field1": "Value 1",
                "field2": "Value 2"
            }
        ]

    const authorSchema = new schema.Entity('myEntities')
    const authorSchemaArray = new schema.Array(authorSchema);

    it("Single entity response should be normalized correctly", () => {
        expect(normalizeData(authorSchema, data)).toEqual({
            entities: {
                myEntities: {
                    "1": {
                        "id": 1,
                        field1: "Value 1",
                        field2: "Value 2",
                    }
                }
            },
            result: 1
        })
    })

    it("Multiple entity response should be normalized correctly", () => {
        expect(normalizeData(authorSchemaArray, dataArray)).toEqual({
            entities: {
                myEntities: {
                    "1": {
                        "id": 1,
                        field1: "Value 1",
                        field2: "Value 2",
                    },
                    "2": {
                        "id": 2,
                        field1: "Value 1",
                        field2: "Value 2",
                    }
                }
            },
            result: [1, 2]
        })
    })

})

