import React from "react";
import PropTypes from "prop-types";
import {Field} from "redux-form";
import {renderInput} from "./formComponents"

let AuthorEditor = ({handleSubmit, pristine, invalid, submitting}) => (
    <div>
        <form id="author-form" onSubmit={handleSubmit}>
            <Field name="name" component={renderInput} type="text" placeholder="name"/>
            <Field name="dateOfBirth" component={renderInput} type="text" placeholder="date of birth"/>

            <button id="save-button" type="submit" disabled={pristine || invalid || submitting}>
                Save
            </button>
        </form>
    </div>
)

AuthorEditor.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default AuthorEditor
