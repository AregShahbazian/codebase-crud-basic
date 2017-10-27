import React from 'react'
import PropTypes from 'prop-types';

const AuthorEntity = ({name, numberOfBooks, dateOfBirth}) => (
    <tr>
        <td>
            {name}
        </td>
        <td>
            {numberOfBooks}
        </td>
        <td>
            {dateOfBirth}
        </td>
    </tr>
)

AuthorEntity.propTypes = {
    name: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    numberOfBooks: PropTypes.number.isRequired
}

export default AuthorEntity

