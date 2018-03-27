import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {reduxForm} from "redux-form";

const mapDispatchToPropsGenerator = (entityRoutines) => ({
    createEntity: entityRoutines.CREATE.trigger
})

class EntityCreateFormContainer extends React.Component {
    submit = () => {
        let {entityCreateForm, createEntity} = this.props
        createEntity(entityCreateForm.values)
    }

    render() {
        return this.props.entityCreateFormGenerator({...this.props, submit: this.submit})
    }
}

EntityCreateFormContainer.propTypes = {
    entityCreateForm: PropTypes.object.isRequired,
    entityCreateFormGenerator: PropTypes.func.isRequired
}

export default (entityRoutines, entityName, validate) => {
    return connect(
        null,
        mapDispatchToPropsGenerator(entityRoutines)
    )(reduxForm({
        form: `${entityName}-create`,
        validate
    })(EntityCreateFormContainer))
}

