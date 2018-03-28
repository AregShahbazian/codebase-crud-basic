import React from "react";
import PropTypes from "prop-types";
import {Field} from "redux-form";
import {renderInput} from "./form/formComponents"

let AuthorFilterForm = ({handleSubmit, submit}) => (
    <div>
        <form id="author-filter-form" onSubmit={handleSubmit(submit)}>
            <fieldset>
                <legend>Filters</legend>
                <Field name="name" component={renderInput} type="text" placeholder="name"/>
                <Field name="dateOfBirth" component={renderInput} type="text" placeholder="date of birth"/>

                <button id="author-filter-apply-button" type="submit">
                    Apply Filter
                </button>
            </fieldset>
        </form>
    </div>
)

AuthorFilterForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
}

export default AuthorFilterForm

