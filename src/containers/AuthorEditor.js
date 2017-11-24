import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {actions} from "../actions/domain";
import {Field, reduxForm} from "redux-form";

const mapStateToProps = (state) => ({
    editorForm: state.form.editorForm,
    initialValues: {
        name: "",
        dateOfBirth: ""
    }
})

const mapDispatchToProps = ({
    onAddClick: actions.author.entityActions.create.do
})

let AuthorEditor = (props) => {

    const {onAddClick, editorForm} = props

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

AuthorEditor.propTypes = {
    editorForm: PropTypes.object,
    onAddClick: PropTypes.func.isRequired
}

AuthorEditor = reduxForm({
    form: 'editorForm'
})(AuthorEditor)

AuthorEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorEditor)


export default AuthorEditor
