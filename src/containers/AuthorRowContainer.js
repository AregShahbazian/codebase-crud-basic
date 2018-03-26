import React from "react";
import {connect} from "react-redux";
import routines from "../actions/domain";
import AuthorRow from "../components/AuthorRow"

const mapDispatchToProps = ({
    prepareForm: routines.AUTHOR.FORM.prepare,
    deleteAuthor: routines.AUTHOR.DELETE.trigger
})

class AuthorRowContainer extends React.Component {
    handleEditClick = () => {
        this.props.prepareForm(this.props.author)
    }

    handleDeleteClick = () => {
        this.props.deleteAuthor(undefined, {id: this.props.author.id})
    }

    render() {
        return <AuthorRow author={this.props.author} handleEditClick={this.handleEditClick} handleDeleteClick={this.handleDeleteClick}/>
    }
}

AuthorRowContainer = connect(
    null,
    mapDispatchToProps
)(AuthorRowContainer)

export default AuthorRowContainer

