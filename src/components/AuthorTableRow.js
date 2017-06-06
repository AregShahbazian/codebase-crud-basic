import React from 'react'
import PropTypes from 'prop-types';

const AuthorTableRow = ({name}) => (
    <tr>
        <td>
            {name}
        </td>
    </tr>
)

AuthorTableRow.propTypes = {
    name: PropTypes.string.isRequired
}

export default AuthorTableRow
