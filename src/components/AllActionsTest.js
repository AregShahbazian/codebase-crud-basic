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
    prepareForm: routines.AUTHOR.FORM.prepare,
    prepareForm1: routines.FORM.prepare1,
    fetchBooks: routines.BOOK.FETCH_ALL.trigger,
})

class AllActionsTest extends Component {
    render() {
        return (null)
    }

    componentDidMount() {
        const {fetchAuthors, fetchAuthorById, searchAuthor, createAuthor, replaceAuthor, updateAuthor, deleteAuthor, prepareForm, prepareForm1,fetchBooks} = this.props

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
                // prepareForm1({id: 2, editMode: true})

                prepareForm({id: undefined, editMode: false})
                setTimeout(() => {
                    createAuthor({name: "Author 3", dateOfBirth: "03-03-1993"})
                    setTimeout(() => {
                        console.info("Edit author 3")
                        prepareForm({id: 3, editMode: true})
                        setTimeout(() => {
                            setTimeout(() => {
                                updateAuthor({name: "Sir Author 3"}, {id: 3})
                                setTimeout(() => {
                                    deleteAuthor(undefined, {id: 3})
                                }, t)
                            }, t)
                        }, t)
                    }, t)
                }, t)
            }, t)
        }, t)

    }
}

AllActionsTest = connect(
    null,
    mapDispatchToProps
)(AllActionsTest)

export default AllActionsTest
