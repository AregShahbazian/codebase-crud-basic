import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import {Serializer} from "jsonapi-serializer"
import paginate from "paginate-array"
import {cloneDeep, orderBy} from "lodash";
import powerset from "powerset"
import {authors} from "./data"

const mock = new MockAdapter(axios, {delayResponse: 500});

const authorAttributes = ["name", "age"];
const authorSerializer = new Serializer("author", {
    id: "id",
    attributes: authorAttributes,
    pluralizeType: false
});

const authorList = Object.values(authors);

const pageSizes = [5, 10];

const getPageData = (dataArray, currentPage, pageSize) =>
    paginate(dataArray, currentPage, pageSize).data;

/**
 *  source: https://stackoverflow.com/questions/18681165/shuffle-an-array-as-many-as-possible
 */
const permute = (function () {
    return permute;

    function permute(list) {
        return list.length ?
            list.reduce(permutate, []) :
            [[]];
    }

    function permutate(permutations, item, index, list) {
        return permutations.concat(permute(
            list.slice(0, index).concat(
                list.slice(index + 1)))
            .map(concat, [item]));
    }

    function concat(list) {
        return this.concat(list);
    }
}());

/**
 * For a list of strings, creates all possible combinations and orderings of ascending and descending objects of the
 * strings
 * */
const createAllOrderedSortingCombos = (attributes) => {
    let attributeSortingFields = []
    attributes.forEach(attribute => {
        let foo = {};
        foo[attribute] = "asc"
        attributeSortingFields = attributeSortingFields.concat(foo)
    })

    let sortingFieldCombos = powerset(attributeSortingFields);
    let allSortingCombos = cloneDeep(sortingFieldCombos);
    sortingFieldCombos.forEach(sortingFieldCombo => {
        let descFieldCombos = powerset(sortingFieldCombo)

        descFieldCombos.forEach(descFieldCombo => {
            if (descFieldCombo.length) {
                let sortingFieldComboClone = cloneDeep(sortingFieldCombo)
                descFieldCombo.forEach(descField => {
                    let descFieldClone = cloneDeep(descField)
                    let key = Object.keys(descField)[0];
                    descFieldClone[key] = "desc";
                    sortingFieldComboClone.splice(sortingFieldCombo.findIndex(field => field[key] === "asc"), 1, descFieldClone)
                });
                allSortingCombos = allSortingCombos.concat([sortingFieldComboClone])
            }
        });

    });

    let allOrderedSortingCombos = [];
    allSortingCombos.forEach(sortingCombo => {
        let sortingComboOrders = permute(sortingCombo)
        sortingComboOrders.forEach(sortingComboOrder => {
            let sortingComboOrderJoined = {}
            sortingComboOrder.forEach(order => {
                sortingComboOrderJoined = Object.assign(sortingComboOrderJoined, order)
            });
            allOrderedSortingCombos = allOrderedSortingCombos.concat(sortingComboOrderJoined)
        })
    });
    return allOrderedSortingCombos;
};

const makeSortingComboString = (sortingCombo) => {
    let sortingFields = [];
    Object.keys(sortingCombo).forEach(field => {
        sortingFields = sortingFields.concat(sortingCombo[field] === "asc" ? field : `-${field}`)
    });
    return sortingFields.join(",");
}

const mockPossiblePages = (data, attributes, serializer, endpoint) => {
    let allOrderedSortingCombos = createAllOrderedSortingCombos(attributes);

    allOrderedSortingCombos.forEach(sortingCombo => {
        let sortingComboString = makeSortingComboString(sortingCombo)

        pageSizes.forEach(pageSize => {
            let lastPage = Math.ceil(data.length / pageSize);

            let currentSortData = orderBy(authorList, Object.keys(sortingCombo), Object.values(sortingCombo))

            console.log(currentSortData)

            for (let currentPage = 1; currentPage <= lastPage; currentPage++) {
                // console.info(`mocking page : ${currentPage}`)
                let currentPageData = getPageData(data, currentPage, pageSize)
                // console.info(`current page data: ${JSON.stringify(currentPageData, null, 2)}`)

                let pageQuery = `page[number]=${currentPage}&page[size]=${pageSize}`;
                let sortingQuery = sortingComboString ? `sort=${sortingComboString}` : "";

                let fullEndpoint = `/${endpoint}?${[pageQuery, sortingQuery].join("&")}`;
                console.log(`Mocking endpoint:\t${fullEndpoint}`)

                mock.onGet(fullEndpoint)
                    .reply(200, serializer.serialize(currentPageData));
            }
        });

    })
};

mockPossiblePages(authorList, authorAttributes, authorSerializer, "author")


/*/!* Pagination no sorting, no filters *!/
mock.onGet("/author?page[number]=1&page[size]=5")
    .reply(200, authorSerializer.serialize(paginate(authorList, 1, 5).data));
mock.onGet("/author?page[number]=2&page[size]=5")
    .reply(200, authorSerializer.serialize(paginate(authorList, 2, 5).data));
mock.onGet("/author?page[number]=3&page[size]=5")
    .reply(200, authorSerializer.serialize(paginate(authorList, 3, 5).data));


/!* Pagination no sorting, with filters*!/
mock.onGet("/author?page[number]=1&page[size]=5")
    .reply(200, authorSerializer.serialize(paginate(authorList, 1, 5).data));
mock.onGet("/author?page[number]=2&page[size]=5")
    .reply(200, authorSerializer.serialize(paginate(authorList, 2, 5).data));
mock.onGet("/author?page[number]=3&page[size]=5")
    .reply(200, authorSerializer.serialize(paginate(authorList, 3, 5).data));


/!* Pagination with sorting, no filters*!/
mock.onGet("/author?page[number]=1&page[size]=5&sort=name")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name"], ["asc"]), 1, 5).data));
mock.onGet("/author?page[number]=2&page[size]=5&sort=name")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name"], ["asc"]), 2, 5).data));
mock.onGet("/author?page[number]=3&page[size]=5&sort=name")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name"], ["asc"]), 3, 5).data));

mock.onGet("/author?page[number]=1&page[size]=5&sort=-name")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name"], ["desc"]), 1, 5).data));
mock.onGet("/author?page[number]=2&page[size]=5&sort=-name")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name"], ["desc"]), 2, 5).data));
mock.onGet("/author?page[number]=3&page[size]=5&sort=-name")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name"], ["desc"]), 3, 5).data));

mock.onGet("/author?page[number]=1&page[size]=5&sort=age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["age"], ["asc"]), 1, 5).data));
mock.onGet("/author?page[number]=2&page[size]=5&sort=age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["age"], ["asc"]), 2, 5).data));
mock.onGet("/author?page[number]=3&page[size]=5&sort=age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["age"], ["asc"]), 3, 5).data));

mock.onGet("/author?page[number]=1&page[size]=5&sort=-age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["age"], ["desc"]), 1, 5).data));
mock.onGet("/author?page[number]=2&page[size]=5&sort=-age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["age"], ["desc"]), 2, 5).data));
mock.onGet("/author?page[number]=3&page[size]=5&sort=-age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["age"], ["desc"]), 3, 5).data));

mock.onGet("/author?page[number]=1&page[size]=5&sort=name,age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name", "age"], ["asc", "asc"]), 1, 5).data));
mock.onGet("/author?page[number]=2&page[size]=5&sort=name,age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name", "age"], ["asc", "asc"]), 2, 5).data));
mock.onGet("/author?page[number]=3&page[size]=5&sort=name,age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name", "age"], ["asc", "asc"]), 3, 5).data));

mock.onGet("/author?page[number]=1&page[size]=5&sort=name,-age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name", "age"], ["asc", "desc"]), 1, 5).data));
mock.onGet("/author?page[number]=2&page[size]=5&sort=name,-age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name", "age"], ["asc", "desc"]), 2, 5).data));
mock.onGet("/author?page[number]=3&page[size]=5&sort=name,-age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name", "age"], ["asc", "desc"]), 3, 5).data));

mock.onGet("/author?page[number]=1&page[size]=5&sort=-name,age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name", "age"], ["desc", "asc"]), 1, 5).data));
mock.onGet("/author?page[number]=2&page[size]=5&sort=-name,age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name", "age"], ["desc", "asc"]), 2, 5).data));
mock.onGet("/author?page[number]=3&page[size]=5&sort=-name,age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name", "age"], ["desc", "asc"]), 3, 5).data));

mock.onGet("/author?page[number]=1&page[size]=5&sort=-name,-age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name", "age"], ["desc", "desc"]), 1, 5).data));
mock.onGet("/author?page[number]=2&page[size]=5&sort=-name,-age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name", "age"], ["desc", "desc"]), 2, 5).data));
mock.onGet("/author?page[number]=3&page[size]=5&sort=-name,-age")
    .reply(200, authorSerializer.serialize(paginate(orderBy(authorList, ["name", "age"], ["desc", "desc"]), 3, 5).data));*/



export {authorSerializer, authors,}