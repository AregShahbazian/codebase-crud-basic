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
        const {fetchAuthors, fetchAuthorById, searchAuthor, createAuthor, replaceAuthor, updateAuthor, deleteAuthor,fetchBooks} = this.props

        fetchAuthors();
        // fetchBooks()
        // fetchAuthorById(undefined, {id: 1});
        // searchAuthor({name: "2"});
        // createAuthor({name: "Author 3", dateOfBirth: "03-03-1993"});
        // replaceAuthor({name: "Sir Author 3", dateOfBirth: "03-03-1993"}, {id: 3});
        // updateAuthor({name: "Sir Author 3"}, {id: 3});
        // deleteAuthor(undefined, {id: 3});

    }
}

AllActionsTest = connect(
    null,
    mapDispatchToProps
)(AllActionsTest)

export default AllActionsTest