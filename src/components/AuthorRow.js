import React from "react";
import PropTypes from "prop-types";

let AuthorRow = ({entity, handleEditClick, handleDeleteClick}) => (
    <tr id={"author-row-" + entity.id}>
        <td className="author-name">
            {entity.name}
        </td>
        <td className="author-dateOfBirth">
            {entity.dateOfBirth}
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
    entity: PropTypes.object.isRequired,
    handleEditClick: PropTypes.func.isRequired,
    handleDeleteClick: PropTypes.func.isRequired
}

export default AuthorRow

