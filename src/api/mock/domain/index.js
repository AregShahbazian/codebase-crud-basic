import config, {author, book, publisher} from "../../../config/index";
import mockPossiblePages from "../mock";
import {authors, books, publishers} from "./data";
import {createAllOrderedSortingCombos} from "../utils";

const authorAttributes = ["name", "age"];
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
const authorSerializerParams = {
    id: "id",
    attributes: authorAttributes
};
mockPossiblePages(
    authors,
    authorSortingCombos,
    authorFilterCollection,
    authorSerializerParams,
    author,
    config.apiRoot,
    config.entities.author.endpoint
);


const publisherAttributes = ["name"];
const publisherSortingCombos = createAllOrderedSortingCombos(publisherAttributes);
const publisherFilterCollection = [
    {},
    {title: "1"},
    {title: "9"}
];
const publisherSerializerParams = {
    id: "id",
    attributes: publisherAttributes,
    author: {
        ref: "id",
        included: true,
        attributes: authorAttributes
    }
};
mockPossiblePages(
    publishers,
    publisherSortingCombos,
    publisherFilterCollection,
    publisherSerializerParams,
    publisher,
    config.apiRoot,
    config.entities.publisher.endpoint
);


const bookAttributes = ["title"];
const bookSortingCombos = createAllOrderedSortingCombos(bookAttributes);
const bookFilterCollection = [
    {},
    {title: "Author 1"},
    {title: "Author 9"}
];
const bookSerializerParams = {
    id: "id",
    attributes: bookAttributes,
    author: {
        ref: "id",
        included: true,
        attributes: authorAttributes
    },
    publisher: {
        ref: "id",
        included: true,
        attributes: publisherAttributes
    }
};
mockPossiblePages(
    books,
    bookSortingCombos,
    bookFilterCollection,
    bookSerializerParams,
    book,
    config.apiRoot,
    config.entities.book.endpoint
);

