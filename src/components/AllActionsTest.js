import React, {Component} from "react";
import {connect} from "react-redux";
import routines from "../actions/domain";


const mapDispatchToProps = ({
    fetchAuthors: routines.AUTHOR.FETCH_ALL.trigger,
    fetchAuthorById: routines.AUTHOR.FETCH_BY_ID.trigger,
    searchAuthor: routines.AUTHOR.SEARCH.trigger,
    createAuthor: routines.AUTHOR.CREATE.trigger,
    replaceAuthor: routines.AUTHOR.REPLACE.trigger,
    updateAuthor: routines.AUTHOR.UPDATE.trigger,
    deleteAuthor: routines.AUTHOR.DELETE.trigger,
    fetchBooks: routines.BOOK.FETCH_ALL.trigger,
})

class AllActionsTest extends Component {
    render() {
        return (null)
    }

    componentDidMount() {
        const {fetchAuthors, fetchAuthorById, searchAuthor, createAuthor, replaceAuthor, updateAuthor, deleteAuthor, fetchBooks} = this.props

        const t = 500;

        // setTimeout(() => fetchAuthors(), t);
        // setTimeout(() => fetchBooks(), t);
        // setTimeout(() => fetchAuthorById(undefined, {id: 3}), t);
        // setTimeout(() => searchAuthor({name: "2"}), t);
        // setTimeout(() => createAuthor({name: "Author 3", dateOfBirth: "03-03-1993"}), t);
        // setTimeout(() => replaceAuthor({name: "Sir Author 3", dateOfBirth: "03-03-1993"}, {id: 3}), t);
        // setTimeout(() => updateAuthor({name: "Sir Author 3"}, {id: 3}), t);
        // setTimeout(() => deleteAuthor(undefined, {id: 3}), t);

        setTimeout(() => {
            fetchAuthors()
            setTimeout(() => {
                createAuthor({name: "Author 3", dateOfBirth: "03-03-1993"})
                setTimeout(() => {
                        updateAuthor({name: "Sir Author 3"}, {id: 3})
                        setTimeout(() => {
                            deleteAuthor(undefined, {id: 3})
                        }, t)
                    }, t
                );
            }, t)
        }, t)
    }
}

AllActionsTest = connect(
    null,
    mapDispatchToProps
)(AllActionsTest)

export default AllActionsTest


const a = {
    "entities": {
        "publisher": {"1": {"id": 1, "name": "myPublisher1"}, "2": {"id": 2, "name": "myPublisher2"}},
        "book": {
            "11": {"id": 11, "name": "book1OfAuthor1"},
            "12": {"id": 12, "name": "book2OfAuthor1"},
            "21": {"id": 21, "name": "book1OfAuthor2"},
            "31": {"id": 31, "name": "book2OfAuthor3"},
            "33": {"id": 33, "name": "book3OfAuthor3"}
        },
        "author": {
            "1": {"id": 1, "name": "Author 1", "dateOfBirth": "01-01-1991", "publisher": 1, "books": [11, 12]},
            "2": {"id": 2, "name": "Author 2", "dateOfBirth": "02-02-1992", "publisher": 2, "books": [21]},
            "3": {"id": 3, "name": "Sir Author 3", "dateOfBirth": "03-03-1993", "publisher": 1, "books": [31, 31, 33]}
        }
    }, "result": [1, 2]
}

const b = {
    "entities": {
        "publisher": {"1": {"id": 1, "name": "myPublisher1"}, "2": {"id": 2, "name": "myPublisher2"}},
        "book": {
            "11": {"id": 11, "name": "book1OfAuthor1"},
            "12": {"id": 12, "name": "book2OfAuthor1"},
            "21": {"id": 21, "name": "book1OfAuthor2"},
            "31": {"id": 31, "name": "book2OfAuthor3"},
            "33": {"id": 33, "name": "book3OfAuthor3"}
        },
        "author": {
            "1": {"id": 1, "name": "Author 1", "dateOfBirth": "01-01-1991", "publisher": 1, "books": [11, 12]},
            "2": {"id": 2, "name": "Author 2", "dateOfBirth": "02-02-1992", "publisher": 2, "books": [21]}
        }
    }, "result": [1, 2]
}
