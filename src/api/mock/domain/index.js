import config from "../../../config/index";
import mockPossiblePages from "../mock";
import {authors} from "./data";

const authorList = Object.values(authors);
const authorAttributes = ["name", "age"];

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

mockPossiblePages(authorList, authorAttributes, authorFilterCollection, "author", config.apiRoot, "author");
