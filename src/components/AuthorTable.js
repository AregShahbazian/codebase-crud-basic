import React from 'react'
import AuthorRow from './AuthorRow'

const AuthorTable = ({authors}) => (

    <table>
        <tbody>
        {authors.map(author =>
            <AuthorRow
                key={author.id}
                name={author.name}
                //{...author}   // TODO: try?
            />
        )}
        </tbody>
    </table>
)

export default AuthorTable
