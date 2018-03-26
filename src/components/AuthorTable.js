import React from "react";
import PropTypes from "prop-types";
import config from "react-global-configuration";
import routines from "../actions/domain";
import entityRowContainerGenerator from "../containers/entityRowContainerGenerator";
import AuthorRow from "./AuthorRow";

const AuthorRowContainer = entityRowContainerGenerator(routines[config.get("entities").author.routineName])

let AuthorTable = ({authors, handleNewClick}) => (
    <div>
        <button id="create-button" onClick={handleNewClick}>
            Create New
        </button>
        <table id="author-table">
            <tbody>
            {authors.map(author =>
                <AuthorRowContainer
                    key={author.id}
                    entity={author}
                    entityRowGenerator={
                        (entityRowProps) =>
                            <AuthorRow {...entityRowProps}/>}
                />
            )}
            </tbody>
        </table>

    </div>
)


AuthorTable.propTypes = {
    authors: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    handleNewClick: PropTypes.func.isRequired
}


export default AuthorTable
