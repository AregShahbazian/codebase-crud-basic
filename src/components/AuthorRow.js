import React from "react";
import PropTypes from "prop-types";

let AuthorRow = ({author, onEditClick}) => (
    <tr>
        <td>
            {author.name}
        </td>
        <td>
            {author.dateOfBirth}
        </td>
        <td>
            <button onClick={onEditClick}>
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

