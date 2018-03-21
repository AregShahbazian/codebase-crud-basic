import React from "react";
import PropTypes from "prop-types";
import {Field} from "redux-form";

let AuthorEditor = ({onSubmit}) => (
    <div>
        <form onSubmit={onSubmit}>
            <Field name="name" component="input" type="text" placeholder="name"/>
            <Field name="dateOfBirth" component="input" type="text" placeholder="dateOfBirth"/>

            <button type="submit">
                Save
            </button>
        </form>
    </div>
)

AuthorEditor.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default AuthorEditor
