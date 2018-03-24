import React from "react";
import PropTypes from "prop-types";

let AuthorRow = ({author, onEditClick, onDeleteClick}) => (
    <tr id={"author-row-" + author.id}>
        <td className="author-name">
            {author.name}
        </td>
        <td className="author-dateOfBirth">
            {author.dateOfBirth}
        </td>
        <td>
            <button className="edit-button" onClick={onEditClick}>
                Edit
            </button>
        </td>
        <td>
            <button className="delete-button" onClick={onDeleteClick }>
                Delete
            </button>
        </td>
    </tr>
)

AuthorRow.propTypes = {
    author: PropTypes.object.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired
}

export default AuthorRow

