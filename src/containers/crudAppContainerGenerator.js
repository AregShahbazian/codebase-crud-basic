import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const mapStateToPropsGenerator = (entityName) => (state) => {
    return {
        entityFilterForm: state.form[`${entityName}-filter`]
    }
}

class CrudAppContainer extends React.Component {
    render() {
        return this.props.crudAppGenerator({
            entityFilterForm: this.props.entityFilterForm
        })
    }
}

CrudAppContainer.propTypes = {
    crudAppGenerator: PropTypes.func.isRequired
}

export default (entityName) => {
    return connect(
        mapStateToPropsGenerator(entityName),
        null
    )(CrudAppContainer)
}

