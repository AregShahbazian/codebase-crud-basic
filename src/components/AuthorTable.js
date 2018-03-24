import React from "react";
import PropTypes from "prop-types";
import AuthorRowContainer from "../containers/AuthorRowContainer";

let AuthorTable = ({authors, onNewClick}) => (
    <div>
        <button id="create-button" onClick={onNewClick}>
            Create New
        </button>
        <table id="author-table">
            <tbody>
            {authors.map(author =>
                <AuthorRowContainer
                    key={author.id}
                    author={author}
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
    onNewClick: PropTypes.func.isRequired
}


export default AuthorTable
