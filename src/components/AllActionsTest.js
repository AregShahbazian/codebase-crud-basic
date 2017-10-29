import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'

const mapDispatchToProps = ({
    fetchAuthors: actions.fetchAuthors,
    fetchAuthor: actions.fetchAuthor,
    addAuthor: actions.addAuthor
})

class AllActionsTest extends Component {
    render() {
        return (null)
    }

    componentDidMount() {
        const {fetchAuthors,fetchAuthor,addAuthor} = this.props

        // fetchAuthors();

        fetchAuthor(3);

        // addAuthor("Name", "dob", 0)
    }
}

AllActionsTest = connect(
    null,
    mapDispatchToProps
)(AllActionsTest)

export default AllActionsTest