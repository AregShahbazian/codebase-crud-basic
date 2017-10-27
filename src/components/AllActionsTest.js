import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'

const mapDispatchToProps = ({
    addAuthor: actions.addAuthor,
    fetchAuthors: actions.fetchAuthors
})

class AllActionsTest extends Component {
    render() {
        return (null)
    }

    componentDidMount() {
        const {addAuthor, fetchAuthors} = this.props

        fetchAuthors();
        // addAuthor("Name", "dob", 0)
    }
}

AllActionsTest = connect(
    null,
    mapDispatchToProps
)(AllActionsTest)

export default AllActionsTest