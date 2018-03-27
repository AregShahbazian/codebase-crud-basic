import React from "react";
import PropTypes from "prop-types";
import config from "react-global-configuration";
import routines from "../actions/domain";
import entityTableContainerGenerator from "../containers/entityTableContainerGenerator";
import entityEditorContainerGenerator from "../containers/entityEditorContainerGenerator";
import AllActionsTest from "../components/AllActionsTest";
import AuthorTable from "./AuthorTable";
import AuthorEditor from "./AuthorEditor";
import {author as authorValidate} from "./validation"

const AUTHOR_ROUTINE_NAME = config.get("entities").author.routineName
const AUTHOR_ENTITY_NAME = "author"

const AuthorTableContainer = entityTableContainerGenerator(routines[AUTHOR_ROUTINE_NAME])
const AuthorEditorContainer = entityEditorContainerGenerator(routines[AUTHOR_ROUTINE_NAME], AUTHOR_ENTITY_NAME, authorValidate)

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
