import React, {Component} from "react";
import {connect} from "react-redux";
import routines from "../../actions/domain";

const mapDispatchToProps = ({
    fetchAuthorById: routines.AUTHOR.FETCH_BY_ID.trigger,
    filterAuthors: routines.AUTHOR.FILTER.trigger,
    createAuthor: routines.AUTHOR.CREATE.trigger,
    replaceAuthor: routines.AUTHOR.REPLACE.trigger,
    updateAuthor: routines.AUTHOR.UPDATE.trigger,
    deleteAuthor: routines.AUTHOR.DELETE.trigger,
    prepareCreateForm: routines.AUTHOR.FORM.prepareCreate,
    prepareUpdateForm: routines.AUTHOR.FORM.prepareUpdate,
    filterBooks: routines.BOOK.FILTER.trigger,
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

class DispatchTest extends Component {
    render() {
        return (null)
    }

    scenario2() {
        const {
            fetchAuthorById,
            filterAuthor,
            createAuthor,
            replaceAuthor,
            updateAuthor,
            deleteAuthor,
            prepareCreateForm,
            prepareUpdateForm,
            filterBooks
        } = this.props

        asyncCall([
            () => prepareCreateForm(),
            () => createAuthor({name: "Author 3", dateOfBirth: "03-03-1993"}),
            () => prepareUpdateForm({id: 2, name: "Author 2", dateOfBirth: "02-02-1992"}),
            () => updateAuthor({name: "Sir Author 2"}, {id: 2}),
            () => deleteAuthor(undefined, {id: 2}),
            // () => filterAuthor({name: "2", dateOfBirth: "1992"})
        ], 500)
    }

    componentDidMount() {
        this.scenario2()
    }
}

DispatchTest = connect(
    null,
    mapDispatchToProps
)(DispatchTest)

export default DispatchTest
