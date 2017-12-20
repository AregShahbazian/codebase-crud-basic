import React, {Component} from "react";
import {connect} from "react-redux";
import {actionCreators} from "../actions/domain";


const mapDispatchToProps = ({
    fetchAuthors: actionCreators.author.fetchAll.do,
    fetchAuthorById: actionCreators.author.fetchById.do,
    createAuthor: actionCreators.author.create.do
})

class AllActionsTest extends Component {
    render() {
        return (null)
    }

    componentDidMount() {
        const {fetchAuthors, fetchAuthorById, createAuthor} = this.props

        fetchAuthors();
        // fetchAuthorById(3);

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