import React from "react";
import PropTypes from "prop-types";

const AuthorEntity = ({name, dateOfBirth}) => (
    <tr>
        <td>
            {name}
        </td>
        <td>
            {dateOfBirth}
        </td>
    </tr>
)

AuthorEntity.propTypes = {
    name: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
}

export default AuthorEntity

