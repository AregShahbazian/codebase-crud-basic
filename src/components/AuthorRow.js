import React from "react";
import PropTypes from "prop-types";

let AuthorRow = ({author, prepareForm}) => (
    <tr>
        <td>
            {author.name}
        </td>
        <td>
            {author.dateOfBirth}
        </td>
        <td>
            <button onClick={() => prepareForm(author)}>
                Edit
            </button>
        </td>
    </tr>
)

AuthorRow.propTypes = {
    author: PropTypes.object.isRequired,
    prepareForm: PropTypes.func.isRequired
}

export default AuthorRow

