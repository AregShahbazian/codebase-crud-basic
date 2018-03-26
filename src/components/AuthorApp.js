import React from "react";
import PropTypes from "prop-types";
import config from "react-global-configuration";
import routines from "../actions/domain";
import entityTableContainerGenerator from "../containers/entityTableContainerGenerator";
import entityEditorContainerGenerator from "../containers/entityEditorContainerGenerator";
import AllActionsTest from "../components/AllActionsTest";
import AuthorTable from "./AuthorTable";
import AuthorEditor from "./AuthorEditor";

const authorRoutineName = config.get("entities").author.routineName
const authorEntityName = "author"

// TODO: refactor, move inside component
const AuthorTableContainer = entityTableContainerGenerator(routines[authorRoutineName])

const authorValidate = values => {
    const errors = {}

    if (!values.name) {
        errors.name = "Name is required"
    }
    if (!values.dateOfBirth) {
        errors.dateOfBirth = "Date of birth is required"
    }

    return errors
}

const AuthorEditorContainer = entityEditorContainerGenerator(routines[authorRoutineName], authorEntityName, authorValidate)

let AuthorApp = ({authors, entityForm}) => (
    <div>
        <AuthorTableContainer
            entityTableGenerator={
                (entityTableProps) =>
                    <AuthorTable {...entityTableProps} authors={authors}/>}
        />
        <AuthorEditorContainer
            entityForm={entityForm}
            entityEditorGenerator={
                (entityEditorProps) =>
                    <AuthorEditor {...entityEditorProps} />}
        />
        <AllActionsTest/>
    </div>
)

AuthorApp.propTypes = {
    authors: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    entityForm: PropTypes.object.isRequired
}

export default AuthorApp
