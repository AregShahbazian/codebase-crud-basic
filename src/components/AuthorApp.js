import React from "react";
import PropTypes from "prop-types";
import AuthorTableContainer from "../containers/AuthorTableContainer";
import AuthorEditorContainer from "../containers/AuthorEditorContainer";
import AllActionsTest from "../components/AllActionsTest";
import AuthorTable from "./AuthorTable";

const AuthorApp = ({authors}) => (
    <div>
        <AuthorTableContainer
            authors={authors}
            entityTableGenerator={(entityRowProps) => <AuthorTable {...entityRowProps}/>}
        />
        <AuthorEditorContainer/>
        <AllActionsTest/>
    </div>
)


AuthorApp.propTypes = {
    authors: PropTypes.array.isRequired
}

export default AuthorApp
