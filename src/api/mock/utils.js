import {stringify} from "qs"
import {cloneDeep, mapKeys} from "lodash";
import powerset from "powerset"
import query from "array-query"

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
};


const applyRelation = (data, field, rel, val) => {
    switch (rel) {
        case "gt":
            return query(field).gt(val).on(data);
        case "gte":
            return query(field).gte(val).on(data);
        case "lt":
            return query(field).lt(val).on(data);
        case "lte":
            return query(field).lte(val).on(data);
        case "is":
            return query(field).is(val).on(data);
        default:
            return data
    }
}

const filterData = (data, filters) => {
    let dataClone = cloneDeep(data)

    mapKeys(filters, (filter, field) => {
        if (typeof filter === 'object') {
            // console.log(filter)
            mapKeys(filter, (val, rel) => {
                dataClone = applyRelation(dataClone, field, rel, val)
            })
        } else {
            // console.log(filter)
            dataClone = query(field).search(filter).on(dataClone)
        }
    })

    return dataClone;

};

const constructFullEndpoint = (filters, currentPage, pageSize, sortingComboString, endpoint) => {
    let filterQuery = !Object.keys(filters).length ? `${stringify(filters, {encode: false})}` : "";
    let pageQuery = `_page[number]=${currentPage}&_page[size]=${pageSize}`;
    let sortingQuery = sortingComboString ? `_sort=${sortingComboString}` : "";
    let queryString = [filterQuery, pageQuery, sortingQuery].filter(s => s.length).join("&");
    return `/${endpoint}?${queryString}`;
};

const getById = (data, id) => {
    return data.filter(o => o.id === id)
}

export {makeSortingComboString, permute, createAllOrderedSortingCombos, filterData, constructFullEndpoint,getById}