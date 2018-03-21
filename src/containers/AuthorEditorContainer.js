import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {bindActionCreators} from 'redux';
import routines from "../actions/domain";
import AuthorEditor from "../components/AuthorEditor"

const mapStateToProps = (state) => ({
    authorForm: state.form.author
})

const mapDispatchToProps = (dispatch) => ({
    createAuthor: bindActionCreators(routines.AUTHOR.CREATE.trigger, dispatch),
    updateAuthor: bindActionCreators(routines.AUTHOR.UPDATE.trigger, dispatch)
})

class AuthorEditorContainer extends Component {

    onSubmit = (e) =>{
        let {authorForm, createAuthor, updateAuthor} = this.props
        console.info(authorForm)

        e.preventDefault()
        /* By default the authorForm.values is undefined, so createAuthor will be called*/
        if (!authorForm.values.id) {
            createAuthor(authorForm.values)
        } else {
            updateAuthor(authorForm.values, {id: authorForm.values.id})
        }

    }

    render() {
        let {authorForm, createAuthor, updateAuthor} = this.props
        return <AuthorEditor authorForm={authorForm} createAuthor={createAuthor} updateAuthor={updateAuthor} onSubmit={this.onSubmit}/>
    }
}

AuthorEditorContainer = reduxForm({
    form: 'author',
    fields: ["id", "name", "dateOfBirth"]
})(AuthorEditorContainer)

AuthorEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorEditorContainer)


export default AuthorEditorContainer
