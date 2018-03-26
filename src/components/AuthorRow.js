import React from "react";
import PropTypes from "prop-types";

let AuthorRow = ({author, handleEditClick, handleDeleteClick}) => (
    <tr id={"author-row-" + author.id}>
        <td className="author-name">
            {author.name}
        </td>
        <td className="author-dateOfBirth">
            {author.dateOfBirth}
        </td>
        <td>
            <button className="edit-button" onClick={handleEditClick}>
                Edit
            </button>
        </td>
        <td>
            <button className="delete-button" onClick={handleDeleteClick }>
                Delete
            </button>
        </td>
    </tr>
)

AuthorRow.propTypes = {
    author: PropTypes.object.isRequired,
    handleEditClick: PropTypes.func.isRequired,
    handleDeleteClick: PropTypes.func.isRequired
}

export default AuthorRow

