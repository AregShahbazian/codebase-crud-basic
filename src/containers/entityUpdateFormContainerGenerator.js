import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {reduxForm} from "redux-form";

const mapDispatchToPropsGenerator = (entityRoutines) => ({
    updateEntity: entityRoutines.UPDATE.trigger
})

class EntityUpdateFormContainer extends React.Component {
    submit = () => {
        let {entityUpdateForm, updateEntity} = this.props
        updateEntity(entityUpdateForm.values, {id: entityUpdateForm.values.id})
    }

    render() {
        return this.props.entityUpdateFormGenerator({...this.props, submit: this.submit})
    }
}

EntityUpdateFormContainer.propTypes = {
    entityUpdateForm: PropTypes.object.isRequired,
    entityUpdateFormGenerator: PropTypes.func.isRequired
}

export default (entityRoutines, entityName, validate) => {
    return connect(
        null,
        mapDispatchToPropsGenerator(entityRoutines)
    )(reduxForm({
        form: `${entityName}-update`,
        validate
    })(EntityUpdateFormContainer))
}

