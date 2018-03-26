import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const mapDispatchToPropsGenerator = (entityRoutines) => ({
    prepareForm: entityRoutines.FORM.prepare,
})

class EntityTableContainer extends React.Component {
    handleNewClick = () => {
        this.props.prepareForm(undefined)
    }

    render() {
        return this.props.entityTableGenerator({handleNewClick: this.handleNewClick})
    }
}

EntityTableContainer.propTypes = {
    entityTableGenerator: PropTypes.func.isRequired
}

export default (entityRoutines) => {
    return connect(
        null,
        mapDispatchToPropsGenerator(entityRoutines)
    )(EntityTableContainer)
}



