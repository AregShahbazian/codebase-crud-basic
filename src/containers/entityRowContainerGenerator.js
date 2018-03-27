import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const mapDispatchToPropsGenerator = (entityRoutines) => ({
    prepareUpdateForm: entityRoutines.FORM.prepareUpdate,
    deleteEntity: entityRoutines.DELETE.trigger
})

class EntityRowContainer extends React.Component {
    handleUpdateClick = () => {
        this.props.prepareUpdateForm(this.props.entity)
    }

    handleDeleteClick = () => {
        this.props.deleteEntity(undefined, {id: this.props.entity.id})
    }

    render() {
        return this.props.entityRowGenerator({
                entity: this.props.entity,
                handleUpdateClick: this.handleUpdateClick,
                handleDeleteClick: this.handleDeleteClick
            }
        )
    }
}

EntityRowContainer.propTypes = {
    entity: PropTypes.object.isRequired,
    entityRowGenerator: PropTypes.func.isRequired
}

export default (entityRoutines) => {
    return connect(
        null,
        mapDispatchToPropsGenerator(entityRoutines)
    )(EntityRowContainer)
}
