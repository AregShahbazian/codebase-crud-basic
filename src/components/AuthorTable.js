import React  from 'react'
import PropTypes from 'prop-types';
import AuthorTableRow from './AuthorTableRow'

const AuthorTable = ({authors}) => (

    <table>
        <tbody>
        {authors.map(author =>
            <AuthorTableRow
                key={author.id}
                {...author}
            />
        )}
        </tbody>
    </table>
)

AuthorTable.propTypes = {
    authors:PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired
}

export default AuthorTable
