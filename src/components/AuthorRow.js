import React from "react";
import PropTypes from "prop-types";

let AuthorRow = ({author, onEditClick}) => (
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
    </tr>
)

AuthorRow.propTypes = {
    author: PropTypes.object.isRequired,
    onEditClick: PropTypes.func.isRequired
}

export default AuthorRow

