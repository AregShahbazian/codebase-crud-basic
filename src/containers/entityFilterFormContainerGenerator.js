import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {reduxForm} from "redux-form";

const mapDispatchToPropsGenerator = (entityRoutines) => ({
    filterEntity: entityRoutines.FILTER.trigger
})

class EntityFilterFormContainer extends React.Component {
    submit = () => {
        let {entityFilterForm, filterEntity} = this.props
        filterEntity(entityFilterForm.values)
    }

    render() {
        return this.props.entityFilterFormGenerator({...this.props, submit: this.submit})
    }
}

EntityFilterFormContainer.propTypes = {
    entityFilterForm: PropTypes.object.isRequired,
    entityFilterFormGenerator: PropTypes.func.isRequired
}

export default (entityRoutines, entityName) => {
    return connect(
        null,
        mapDispatchToPropsGenerator(entityRoutines)
    )(reduxForm({
        form: `${entityName}-filter`
    })(EntityFilterFormContainer))
}

