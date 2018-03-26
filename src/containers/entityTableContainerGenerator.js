import React from "react";
import {connect} from "react-redux";
import routines from "../actions/domain";
import PropTypes from "prop-types";

const mapDispatchToPropsGenerator = (routineName) => ({
    prepareForm: routines[routineName].FORM.prepare,
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

export default (routineName) => {
    return connect(
        null,
        mapDispatchToPropsGenerator(routineName)
    )(EntityTableContainer)
}



