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
    fetchBooks: routines.BOOK.FETCH_ALL.trigger,
})


async function asyncCall(calls, timeout) {
    for (let call of calls) {
        let result = await new Promise(resolve => {
            setTimeout(() => {
                let callResult = call()
                resolve(callResult)
            }, timeout)
        })
        console.log(result);
    }
}

class AllActionsTest extends Component {
    render() {
        return (null)
    }

    scenario2() {
        const {fetchAuthors, fetchAuthorById, searchAuthor, createAuthor, replaceAuthor, updateAuthor, deleteAuthor, prepareForm, prepareForm1, fetchBooks} = this.props

        asyncCall([
            () => prepareForm(undefined),
            () => createAuthor({name: "Author 3", dateOfBirth: "03-03-1993"}),
            () => prepareForm({id: 2, name: "Author 2", dateOfBirth: "02-02-1992"}),
            () => updateAuthor({name: "Sir Author 2"}, {id: 2}),
            () => deleteAuthor(undefined, {id: 2})
        ], 300)
    }

    componentDidMount() {
        // this.scenario2()
    }
}

AllActionsTest = connect(
    null,
    mapDispatchToProps
)(AllActionsTest)

export default AllActionsTest
