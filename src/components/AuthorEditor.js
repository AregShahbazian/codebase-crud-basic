import React from "react";
import PropTypes from "prop-types";
import {Field} from "redux-form";
import {renderInput} from "./form/formComponents"

let AuthorEditor = ({handleSubmit, submit, pristine, submitting}) => (
    <div>
        <form id="author-form" onSubmit={handleSubmit(submit)}>
            <Field name="name" component={renderInput} type="text" placeholder="name"/>
            <Field name="dateOfBirth" component={renderInput} type="text" placeholder="date of birth"/>

            <button id="save-button" type="submit" disabled={pristine || submitting}>
                Save
            </button>
        </form>
    </div>
)

AuthorEditor.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired
}

export default AuthorEditor
