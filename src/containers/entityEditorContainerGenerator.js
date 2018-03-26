import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {reduxForm} from "redux-form";

const mapDispatchToPropsGenerator = (entityRoutines) => ({
    createEntity: entityRoutines.CREATE.trigger,
    updateEntity: entityRoutines.UPDATE.trigger
})

class EntityEditorContainer extends React.Component {
    submit = () => {
        let {entityForm, createEntity, updateEntity} = this.props
        /* By default the entityForm.values is undefined, so createEntity will be called*/
        if (entityForm.values && entityForm.values.id) {
            updateEntity(entityForm.values, {id: entityForm.values.id})
        } else {
            createEntity(entityForm.values)
        }
    }

    render() {
        return this.props.entityEditorGenerator({...this.props, submit: this.submit})
    }
}

EntityEditorContainer.propTypes = {
    entityForm: PropTypes.object.isRequired,
    entityEditorGenerator: PropTypes.func.isRequired
}

export default (entityRoutines, entityName, validate) => {
    return connect(
        null,
        mapDispatchToPropsGenerator(entityRoutines)
    )(reduxForm({
        form: entityName,
        validate
    })(EntityEditorContainer))
}

