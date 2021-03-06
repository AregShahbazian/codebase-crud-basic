import React from "react";
import PropTypes from "prop-types";
import {Field} from "redux-form";
import {renderInput} from "./form/formComponents"

let AuthorUpdateForm = ({handleSubmit, submit, pristine, submitting}) => (
    <div>
        <form id="author-update-form" onSubmit={handleSubmit(submit)}>
            <fieldset>
                <legend>Edit Author</legend>
                <Field name="name" component={renderInput} type="text" placeholder="name"/>
                <Field name="dateOfBirth" component={renderInput} type="text" placeholder="date of birth"/>

                <button id="author-update-save-button" type="submit" disabled={pristine || submitting}>
                    Save
                </button>
            </fieldset>
        </form>
    </div>
)

AuthorUpdateForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired
}

export default AuthorUpdateForm
