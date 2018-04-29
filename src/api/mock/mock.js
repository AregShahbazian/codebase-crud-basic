import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import {Serializer} from "jsonapi-serializer"
import paginate from "paginate-array"
import {orderBy} from "lodash";
import {constructFullEndpoint, filterData, makeSortingComboString} from "./utils";

const mock = new MockAdapter(axios, {delayResponse: 500});
const pageSizes = [5, 10];

export default (data, sortingCombos, filterCollection, serializeParams, entityName, apiRoot, endpoint) => {
    pageSizes.forEach(pageSize => {

        filterCollection.forEach(filters => {
            let currentFilterData = filterData(data, filters);
            let totalPages = Math.ceil(currentFilterData.length / pageSize);

            sortingCombos.forEach(sortingCombo => {
                let sortingComboString = makeSortingComboString(sortingCombo);
                let currentSortData = orderBy(currentFilterData, Object.keys(sortingCombo), Object.values(sortingCombo));

                for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
                    let selfFullEndpoint = constructFullEndpoint(filters, currentPage, pageSize, sortingComboString, endpoint);
                    let firstFullEndpoint = constructFullEndpoint(filters, 1, pageSize, sortingComboString, endpoint);
                    let lastFullEndpoint = constructFullEndpoint(filters, totalPages, pageSize, sortingComboString, endpoint);
                    let prevFullEndpoint = currentPage > 1 ?
                        constructFullEndpoint(filters, currentPage - 1, pageSize, sortingComboString, endpoint) : undefined;
                    let nextFullEndpoint = currentPage < totalPages ?
                        constructFullEndpoint(filters, currentPage + 1, pageSize, sortingComboString, endpoint) : undefined;

                    let topLevelLinks = {
                        self: `${apiRoot}${selfFullEndpoint}`,
                        first: `${apiRoot}${firstFullEndpoint}`,
                        last: `${apiRoot}${lastFullEndpoint}`,
                        prev: prevFullEndpoint ? `${apiRoot}${prevFullEndpoint}` : undefined,
                        next: nextFullEndpoint ? `${apiRoot}${nextFullEndpoint}` : undefined,
                    };

                    let serializer = new Serializer(entityName, {
                        ...serializeParams,
                        pluralizeType: false,
                        meta: {totalPages},
                        topLevelLinks
                    });

                    let currentPageData = paginate(currentSortData, currentPage, pageSize).data;
                    let jsonApiData = serializer.serialize(currentPageData);

                    // console.log(`Mocking endpoint:\t${selfFullEndpoint}`)
                    // console.log(`response: ${JSON.stringify(jsonApiData, null, 2)}`)

                    mock.onGet(selfFullEndpoint).reply(200, jsonApiData);
                }
            });
        });
    })
};
