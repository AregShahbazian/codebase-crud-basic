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
        entityTableLoading: state[entityName].loading,
        entityTablePages: state[entityName].pages
    }
}

const mapDispatchToPropsGenerator = (entityRoutines) => ({
    filterEntities: entityRoutines.FILTER.trigger,
    deleteEntity: entityRoutines.DELETE.trigger,
    prepareCreateForm: entityRoutines.FORM.prepareCreate,
    prepareUpdateForm: entityRoutines.FORM.prepareUpdate
})

class EntityTableContainer extends React.Component {
    handleNewClick = () => {
        this.props.prepareCreateForm()
    }

    handleUpdateClick = (entity) => {
        this.props.prepareUpdateForm(entity)
    }

    handleDeleteClick = (entity) => {
        this.props.deleteEntity(undefined, {id: entity.id})
    }

    refreshTableData(tableLocalState, instance) {
        let {pageSize, page, sorted} = tableLocalState
        this.props.filterEntities(this.props.entityFilterForm.values, {pageSize, page, sorted})
    }

    render() {
        let {entities, entityTablePages, entityTableLoading} = this.props;

        return this.props.entityTableGenerator({
            entities: entities,
            handleNewClick: this.handleNewClick,
            handleUpdateClick: this.handleUpdateClick,
            handleDeleteClick: this.handleDeleteClick,
            pages: entityTablePages,
            loading: entityTableLoading,
            refreshTableData: this.refreshTableData.bind(this)
        })
    }
}

EntityTableContainer.propTypes = {
    entityTableGenerator: PropTypes.func.isRequired,
    entityFilterForm: PropTypes.object.isRequired
}

export default (entityRoutines, entityName) => {
    return connect(
        mapStateToPropsGenerator(entityName),
        mapDispatchToPropsGenerator(entityRoutines)
    )(EntityTableContainer)
}



