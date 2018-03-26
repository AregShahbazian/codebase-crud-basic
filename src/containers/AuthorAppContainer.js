import React from "react";
import {connect} from "react-redux";
import {concat, forEach} from "lodash";
import routines from "../actions/domain";
import AuthorApp from "../components/AuthorApp";

// TODO: refactor
const getEntitiesFromState = (entityState, entityName) => {
    let cachedEntities = []
    forEach(entityState.result, (id) => (cachedEntities = concat(cachedEntities, entityState.entities[entityName][id])))
    return cachedEntities
}

const mapStateToProps = (state) => ({
    authors: getEntitiesFromState(state.author, "author")
})

const mapDispatchToProps = ({
    fetchAuthors: routines.AUTHOR.FETCH_ALL.trigger
})

class AppContainer extends React.Component {
    render() {
        return <AuthorApp authors={this.props.authors}/>
    }

    componentDidMount() {
        this.props.fetchAuthors()
    }
}

AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer)

export default AppContainer
