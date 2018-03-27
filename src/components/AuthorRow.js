import React from "react";
import PropTypes from "prop-types";

let AuthorRow = ({entity, handleUpdateClick, handleDeleteClick}) => (
    <tr id={"author-row-" + entity.id}>
        <td className="author-name">
            {entity.name}
        </td>
        <td className="author-dateOfBirth">
            {entity.dateOfBirth}
        </td>
        <td>
            <button className="update-button" onClick={handleUpdateClick}>
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
    handleUpdateClick: PropTypes.func.isRequired,
    handleDeleteClick: PropTypes.func.isRequired
}

export default AuthorRow

