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

const mapStateToPropsGenerator = (entityName) => (state) => ({
    entities: getEntitiesFromState(state[entityName], entityName),
    entityForm: state.form[entityName]
})

const mapDispatchToPropsGenerator = (entityRoutines) => ({
    fetchEntities: entityRoutines.FETCH_ALL.trigger
})

class CrudAppContainer extends React.Component {
    render() {
        return this.props.crudAppGenerator({entities: this.props.entities, entityForm: this.props.entityForm})
    }

    componentDidMount() {
        this.props.fetchEntities()
    }
}

CrudAppContainer.propTypes = {
    crudAppGenerator: PropTypes.func.isRequired
}

export default (entityRoutines, entityName) => {
    return connect(
        mapStateToPropsGenerator(entityName),
        mapDispatchToPropsGenerator(entityRoutines)
    )(CrudAppContainer)
}

