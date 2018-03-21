import React from "react";
import PropTypes from "prop-types";
import AuthorRowContainer from "../containers/AuthorRowContainer";

let AuthorTable = ({authors, prepareForm}) => (
    <div>
        <button onClick={() => prepareForm({id: undefined, editMode: false})}>
            Create New
        </button>
        <table>
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
    prepareForm: PropTypes.func.isRequired
}


export default AuthorTable
