import "../config";
import {schema} from "normalizr";
import {createRequest, DELETE, GET, normalizeData, PATCH, POST, PUT} from "./index";


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

    it("should normalize single entity response correctly", () => {
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

    it("should normalize multiple entity response correctly", () => {
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

