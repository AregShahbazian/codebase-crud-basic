import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import paginate from "paginate-array"
import {stringify} from "qs"
import $ from "jquery";
import {orderBy} from "lodash";
import {filterData, makeSortingComboString} from "./utils";

const mock = new MockAdapter(axios, {delayResponse: 500});
const pageSizes = [5, 10];

export default (data, sortingCombos, serializer, filterCollection, endpoint) => {
    pageSizes.forEach(pageSize => {

        filterCollection.forEach(filters => {
            let currentFilterData = filterData(data, filters);

            sortingCombos.forEach(sortingCombo => {
                let sortingComboString = makeSortingComboString(sortingCombo);
                let currentSortData = orderBy(currentFilterData, Object.keys(sortingCombo), Object.values(sortingCombo));

                let lastPage = Math.ceil(currentSortData.length / pageSize);

                for (let currentPage = 1; currentPage <= lastPage; currentPage++) {
                    let currentPageData = paginate(currentSortData, currentPage, pageSize).data;

                    let filterQuery = !$.isEmptyObject(filters) ? `${stringify(filters, {encode: false})}` : "";
                    let pageQuery = `_page[number]=${currentPage}&_page[size]=${pageSize}`;
                    let sortingQuery = sortingComboString ? `_sort=${sortingComboString}` : "";

                    let queryString = [filterQuery, pageQuery, sortingQuery].filter(s => s.length).join("&")

                    let fullEndpoint = `/${endpoint}?${queryString}`;
                    console.log(`Mocking endpoint:\t${fullEndpoint}`)
                    console.log(`response: ${JSON.stringify(serializer.serialize(currentPageData), null, 2)}`)
                    mock.onGet(fullEndpoint)
                        .reply(200, serializer.serialize(currentPageData));
                }
            });
        });
    })
};
