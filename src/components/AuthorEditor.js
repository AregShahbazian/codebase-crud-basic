import React from "react";
import PropTypes from "prop-types";
import {Field} from "redux-form";

let AuthorEditor = ({createAuthor, updateAuthor, authorForm, onSubmit}) => (
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
    authorForm: PropTypes.object,
    createAuthor: PropTypes.func.isRequired,
    updateAuthor: PropTypes.func.isRequired
}

export default AuthorEditor
