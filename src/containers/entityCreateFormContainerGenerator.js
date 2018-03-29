import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {reduxForm} from "redux-form";

const mapStateToPropsGenerator = (entityName) => (state) => {
    return {
        entityCreateForm: state.form[`${entityName}-create`],
    }
}

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
    entityCreateFormGenerator: PropTypes.func.isRequired
}

export default (entityRoutines, entityName, validate) => {
    return connect(
        mapStateToPropsGenerator(entityName),
        mapDispatchToPropsGenerator(entityRoutines)
    )(reduxForm({
        form: `${entityName}-create`,
        validate
    })(EntityCreateFormContainer))
}

