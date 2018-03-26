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

const validate = values => {
    const errors = {}

    if (!values.name) {
        errors.name = "Name is required"
    }
    if (!values.dateOfBirth) {
        errors.dateOfBirth = "Date of birth is required"
    }

    return errors
}

class AuthorEditorContainer extends React.Component {
    submit = () => {
        let {authorForm, createAuthor, updateAuthor} = this.props
        /* By default the authorForm.values is undefined, so createAuthor will be called*/
        if (authorForm.values && authorForm.values.id) {
            updateAuthor(authorForm.values, {id: authorForm.values.id})
        } else {
            createAuthor(authorForm.values)
        }
    }

    render() {
        return <AuthorEditor {...this.props} submit={this.submit}/>
    }
}

AuthorEditorContainer = reduxForm({
    form: 'author',
    fields: ["id", "name", "dateOfBirth"],
    validate
})(AuthorEditorContainer)

AuthorEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorEditorContainer)


export default AuthorEditorContainer
