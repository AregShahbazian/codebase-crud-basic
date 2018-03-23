import React from "react";
import {connect} from "react-redux";
import routines from "../actions/domain";
import AuthorApp from "../components/AuthorApp";

const mapDispatchToProps = ({
    fetchAuthors: routines.AUTHOR.FETCH_ALL.trigger
})

class AppContainer extends React.Component {
    render() {
        return <AuthorApp/>
    }

    componentDidMount() {
        this.props.fetchAuthors()
    }
}

AppContainer = connect(
    null,
    mapDispatchToProps
)(AppContainer)

export default AppContainer
