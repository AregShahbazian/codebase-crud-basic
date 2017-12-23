import React, {Component} from "react";
import {connect} from "react-redux";
import {routines} from "../actions/domain";


const mapDispatchToProps = ({
    fetchAuthors: routines.AUTHOR.FETCH_ALL.trigger,
    fetchAuthorById: routines.AUTHOR.FETCH_BY_ID.trigger,
    searchAuthor: routines.AUTHOR.SEARCH.trigger,
    createAuthor: routines.AUTHOR.CREATE.trigger
})

class AllActionsTest extends Component {
    render() {
        return (null)
    }

    componentDidMount() {
        const {fetchAuthors, fetchAuthorById, searchAuthor, createAuthor} = this.props

        fetchAuthors();
        // fetchAuthorById(undefined, {id: 1});
        // searchAuthor({name: "2"});
        createAuthor({name : "Author 3" ,dateOfBirth: "03-03-1993"});


        // createAuthor("Name", "dob", 0)

        // const {response, error} = api.foo()

        // console.log("response");
        // console.log(response);
        // console.error("error");
        // console.error(error)
    }
}

AllActionsTest = connect(
    null,
    mapDispatchToProps
)(AllActionsTest)

export default AllActionsTest