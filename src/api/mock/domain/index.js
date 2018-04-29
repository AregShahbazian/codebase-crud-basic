import {Serializer} from "jsonapi-serializer"
import mockPossiblePages from "../mock";
import {authors} from "./data";
import {createAllOrderedSortingCombos} from "../utils";

const authorList = Object.values(authors);
const authorAttributes = ["name", "age"];
const authorSerializer = new Serializer("author", {
    id: "id",
    attributes: authorAttributes,
    pluralizeType: false
});

const authorSortingCombos = createAllOrderedSortingCombos(authorAttributes);

const authorFilterCollection = [
    {},
    {name: "Twin"},
    {
        age: {
            gt: "30",
            lt: "40"
        }
    },
    {
        name: "Anonymous",
        age: {
            gt: "40"
        }
    },
    {
        age: {
            is: "30"
        }
    },
    {
        age: {
            lt: "30"
        }
    }
];

mockPossiblePages(authorList, authorSortingCombos, authorSerializer, authorFilterCollection, "author");
