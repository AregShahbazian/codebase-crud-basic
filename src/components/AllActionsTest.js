import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'

const mapDispatchToProps = ({
    fetchAllAuthors: actions.author.fetchAll.do,
    fetchAuthorById: actions.author.fetchById.do,
    createAuthor: actions.author.create.do
})

class AllActionsTest extends Component {
    render() {
        return (null)
    }

    componentDidMount() {
        const {fetchAllAuthors,fetchAuthorById,createAuthor} = this.props

        // fetchAllAuthors();

        fetchAuthorById(3);

        // createAuthor("Name", "dob", 0)
    }
}

AllActionsTest = connect(
    null,
    mapDispatchToProps
)(AllActionsTest)

export default AllActionsTest