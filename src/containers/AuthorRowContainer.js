import React from "react";
import {connect} from "react-redux";
import routines from "../actions/domain";
import PropTypes from "prop-types";

const mapDispatchToProps = {
    prepareForm: routines.AUTHOR.FORM.prepare,
    deleteAuthor: routines.AUTHOR.DELETE.trigger
}

class AuthorRowContainer extends React.Component {
    handleEditClick = () => {
        this.props.prepareForm(this.props.entity)
    }

    handleDeleteClick = () => {
        this.props.deleteAuthor(undefined, {id: this.props.entity.id})
    }

    render() {
        return this.props.entityRowGenerator({
                entity: this.props.entity,
                handleEditClick: this.handleEditClick,
                handleDeleteClick: this.handleDeleteClick
            }
        )
    }
}

AuthorRowContainer.propTypes = {
    entity: PropTypes.object.isRequired,
    entityRowGenerator: PropTypes.func.isRequired
}

AuthorRowContainer = connect(
    null,
    mapDispatchToProps
)(AuthorRowContainer)

export default AuthorRowContainer

