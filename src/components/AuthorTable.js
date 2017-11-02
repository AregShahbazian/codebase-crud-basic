import React from "react";
import PropTypes from "prop-types";
import AuthorEntity from "./AuthorEntity";

const AuthorTable = ({authors}) => (

    <table>
        <tbody>
        {authors.map(author =>
            <AuthorEntity
                key={author.id}
                {...author}
            />
        )}
        </tbody>
    </table>
)

AuthorTable.propTypes = {
    authors: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired
}

export default AuthorTable
