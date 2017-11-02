import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as authorActions from '../actions/domain/author'
import api from '../services'


const mapDispatchToProps = ({
    fetchAllAuthors: authorActions.entityActions.fetchAll.do,
    fetchAuthorById: authorActions.entityActions.fetchById.do,
    createAuthor: authorActions.entityActions.create.do
})

class AllActionsTest extends Component {
    render() {
        return (null)
    }

    componentDidMount() {
        const {fetchAllAuthors,fetchAuthorById,createAuthor} = this.props

        fetchAllAuthors();
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