import React from "react";
import {connect} from "react-redux";
import routines from "../actions/domain";
import PropTypes from "prop-types";

const mapDispatchToPropsGenerator = (routineName) => ({
    prepareForm: routines[routineName].FORM.prepare,
    deleteEntity: routines[routineName].DELETE.trigger
})

class EntityRowContainer extends React.Component {
    handleEditClick = () => {
        this.props.prepareForm(this.props.entity)
    }

    handleDeleteClick = () => {
        this.props.deleteEntity(undefined, {id: this.props.entity.id})
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

EntityRowContainer.propTypes = {
    entity: PropTypes.object.isRequired,
    entityRowGenerator: PropTypes.func.isRequired
}

export default (routineName) => {
    return connect(
        null,
        mapDispatchToPropsGenerator(routineName)
    )(EntityRowContainer)
}

