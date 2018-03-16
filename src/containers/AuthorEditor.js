import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import routines from "../actions/domain";
import {Field, reduxForm, change} from "redux-form";

const mapStateToProps = (state) => ({
    editorForm: state.form.editorForm,
    author1: state.author
})

const mapDispatchToProps = (dispatch) => ({
    onAddClick: routines.AUTHOR.CREATE.trigger,
    changeFieldValue: (field, value) => {
        dispatch(change('editorForm', field, value))
    }
})

class AuthorEditor extends Component {
    render() {
        const {onAddClick,editorForm} = this.props

        return (
            <div>
                <form onSubmit={e => {
                    e.preventDefault()
                    onAddClick(editorForm.values)
                }}>

                    <Field name="name" component="input" type="text" placeholder="name"/>
                    <Field name="dateOfBirth" component="input" type="text" placeholder="dateOfBirth"/>

                    <div>{JSON.stringify(editorForm?editorForm.values:"")}</div>


                    <button type="submit">
                        Save
                    </button>
                </form>
            </div>
        )
    }

    componentDidUpdate() {
        const {changeFieldValue, author1} = this.props
        changeFieldValue("name", JSON.stringify(author1.result))
    }

}

AuthorEditor.propTypes = {
    editorForm: PropTypes.object,
    onAddClick: PropTypes.func.isRequired
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
