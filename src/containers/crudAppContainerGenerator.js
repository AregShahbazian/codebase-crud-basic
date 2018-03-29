import React from "react";
import {connect} from "react-redux";
import {concat, forEach} from "lodash";
import PropTypes from "prop-types";

const getEntitiesFromState = (entityState, entityName) => {
    let cachedEntities = []
    forEach(entityState.result, (id) => {
        cachedEntities = concat(cachedEntities, entityState.entities[entityName][id])
    })
    return cachedEntities
}

const mapStateToPropsGenerator = (entityName) => (state) => {
    return {
        entities: getEntitiesFromState(state[entityName], entityName),
        entityFilterForm: state.form[`${entityName}-filter`],
        entityCreateForm: state.form[`${entityName}-create`],
        entityUpdateForm: state.form[`${entityName}-update`]
    }
}

class CrudAppContainer extends React.Component {
    render() {
        return this.props.crudAppGenerator({
            entities: this.props.entities,
            entityFilterForm: this.props.entityFilterForm,
            entityCreateForm: this.props.entityCreateForm,
            entityUpdateForm: this.props.entityUpdateForm
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

