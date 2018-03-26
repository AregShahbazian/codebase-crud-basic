import React from "react";
import PropTypes from "prop-types";
import config from "react-global-configuration";
import entityTableContainerGenerator from "../containers/entityTableContainerGenerator";
import AuthorEditorContainer from "../containers/AuthorEditorContainer";
import AllActionsTest from "../components/AllActionsTest";
import AuthorTable from "./AuthorTable";

const AuthorTableContainer = entityTableContainerGenerator(config.get("entities").author.routineName)

let AuthorApp = ({authors}) => (
    <div>
        <AuthorTableContainer
            entityTableGenerator={
                (entityTableProps) =>
                    <AuthorTable {...entityTableProps} authors={authors}/>}
        />
        <AuthorEditorContainer/>
        <AllActionsTest/>
    </div>
)

AuthorApp.propTypes = {
    authors: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired
}

export default AuthorApp
