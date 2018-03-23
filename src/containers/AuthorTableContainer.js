import React from "react";
import {concat, forEach} from "lodash";
import {connect} from "react-redux";
import routines from "../actions/domain";
import AuthorTable from "../components/AuthorTable"

const getAuthorsFromState = (authors) => {
    let cachedAuthors = []
    forEach(authors.result, (id) => (cachedAuthors = concat(cachedAuthors, authors.entities.author[id])))
    return cachedAuthors
}

const mapDispatchToProps = ({
    prepareForm: routines.AUTHOR.FORM.prepare
})

const mapStateToProps = (state) => ({
    authors: getAuthorsFromState(state.author)
})


class AuthorTableContainer extends React.Component {
    onNewClick = () => {
        this.props.prepareForm(undefined)
    }

    render() {
        return <AuthorTable authors={this.props.authors} onNewClick={this.onNewClick}/>
    }
}

AuthorTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorTableContainer)

export default AuthorTableContainer
