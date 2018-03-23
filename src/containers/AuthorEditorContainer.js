import React from "react";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import routines from "../actions/domain";
import AuthorEditor from "../components/AuthorEditor"

const mapStateToProps = (state) => ({
    authorForm: state.form.author
})

const mapDispatchToProps = ({
    createAuthor: routines.AUTHOR.CREATE.trigger,
    updateAuthor: routines.AUTHOR.UPDATE.trigger
})

class AuthorEditorContainer extends React.Component {
    onSubmit = (e) => {
        let {authorForm, createAuthor, updateAuthor} = this.props
        e.preventDefault()
        /* By default the authorForm.values is undefined, so createAuthor will be called*/
        if (authorForm.values && authorForm.values.id) {
            updateAuthor(authorForm.values, {id: authorForm.values.id})
        } else {
            createAuthor(authorForm.values)
        }
    }

    render() {
        return <AuthorEditor onSubmit={this.onSubmit}/>
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
