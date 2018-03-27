import React from "react";
import PropTypes from "prop-types";
import config from "react-global-configuration";
import routines from "../actions/domain";
import entityTableContainerGenerator from "../containers/entityTableContainerGenerator";
import entityEditorContainerGenerator from "../containers/entityEditorContainerGenerator";
import AuthorTable from "./AuthorTable";
import AuthorEditor from "./AuthorEditor";
import AllActionsTest from "../components/AllActionsTest";
import {author as authorValidate} from "./form/validation"

const AUTHOR_ENTITY_NAME = "author"
const AUTHOR_ROUTINE_NAME = config.get("entities")[AUTHOR_ENTITY_NAME].routineName

const AuthorTableContainer = entityTableContainerGenerator(routines[AUTHOR_ROUTINE_NAME])
const AuthorEditorContainer = entityEditorContainerGenerator(routines[AUTHOR_ROUTINE_NAME], AUTHOR_ENTITY_NAME, authorValidate)

let AuthorApp = ({entities, entityForm}) => (
    <div>
        <AuthorTableContainer
            entityTableGenerator={
                (entityTableProps) =>
                    // props needed only by the component
                    <AuthorTable {...entityTableProps} entities={entities}/>}
        />
        <AuthorEditorContainer
            // props needed by the container
            entityForm={entityForm}
            entityEditorGenerator={
                (entityEditorProps) =>
                    // props needed only by the component
                    <AuthorEditor {...entityEditorProps} />}
        />
        <AllActionsTest/>
    </div>
)

AuthorApp.propTypes = {
    entities: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    entityForm: PropTypes.object.isRequired
}

export default AuthorApp
