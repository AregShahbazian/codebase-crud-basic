import React from "react";
import {connect} from "react-redux";
import routines from "../actions/domain";
import AuthorRow from "../components/AuthorRow"

const mapDispatchToProps = ({
    prepareForm: routines.AUTHOR.FORM.prepare,
    deleteAuthor: routines.AUTHOR.DELETE.trigger
})

class AuthorRowContainer extends React.Component {
    onEditClick = () => {
        this.props.prepareForm(this.props.author)
    }

    onDeleteClick = () => {
        this.props.deleteAuthor(undefined, {id: this.props.author.id})
    }

    render() {
        return <AuthorRow author={this.props.author} onEditClick={this.onEditClick} onDeleteClick={this.onDeleteClick}/>
    }
}

AuthorRowContainer = connect(
    null,
    mapDispatchToProps
)(AuthorRowContainer)

export default AuthorRowContainer

