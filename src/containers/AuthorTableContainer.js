import React from "react";
import {concat, forEach} from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import routines from "../actions/domain";
import AuthorTable from "../components/AuthorTable"

const getAuthorsFromState = (authors) => {
    let cachedAuthors = []
    forEach(authors.result, (id) => (cachedAuthors = concat(cachedAuthors, authors.entities.author[id])))
    return cachedAuthors
}

const mapDispatchToProps = (dispatch) => ({
    prepareForm: bindActionCreators(routines.AUTHOR.FORM.prepare, dispatch)
})

const mapStateToProps = (state) => ({
    authors: getAuthorsFromState(state.author)
})


class AuthorTableContainer extends React.Component {
    render() {
        return <AuthorTable authors={this.props.authors} prepareForm={this.props.prepareForm}/>
    }
}

AuthorTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorTableContainer)

export default AuthorTableContainer
