import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import routines from "../actions/domain";
import {Field, reduxForm, change} from "redux-form";

const mapStateToProps = (state) => ({
    editorForm: state.form.editorForm,
    authors: state.author.entities.author,
    editingAuthorId: state.author.workspace.editing
})

const mapDispatchToProps = (dispatch) => ({
    onAddClick: (values) => dispatch(routines.AUTHOR.CREATE.trigger(values)),
    changeFieldValue: (field, value) => {
        dispatch(change('editorForm', field, value))
    }
})

class AuthorEditor extends Component {
    render() {
        const {onAddClick, editorForm} = this.props

        return (
            <div>
                <form onSubmit={e => {
                    e.preventDefault()
                    onAddClick(editorForm.values)
                }}>

                    <Field name="name" component="input" type="text" placeholder="name"/>
                    <Field name="dateOfBirth" component="input" type="text" placeholder="dateOfBirth"/>

                    <button type="submit">
                        Save
                    </button>
                </form>
            </div>
        )
    }

    componentDidUpdate(prevProps) {
        let {changeFieldValue, authors, editingAuthorId} = this.props

        if (editingAuthorId !== prevProps.editingAuthorId) {
            changeFieldValue("name", editingAuthorId !== null ? authors[editingAuthorId].name : "")
            changeFieldValue("dateOfBirth", editingAuthorId !== null ? authors[editingAuthorId].dateOfBirth : "")
        }
    }

}

AuthorEditor.propTypes = {
    editorForm: PropTypes.object,
    authors: PropTypes.object,
    editingAuthorId: PropTypes.number,
    onAddClick: PropTypes.func.isRequired,
    changeFieldValue: PropTypes.func.isRequired
}

AuthorEditor = reduxForm({
    form: 'editorForm',
    fields: ["name", "dateOfBirth"]
})(AuthorEditor)

AuthorEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorEditor)


export default AuthorEditor
