import React from "react";
import PropTypes from "prop-types";
import {concat, forEach} from "lodash";
import {connect} from "react-redux";
import AuthorRow from "../components/AuthorEntity";

const getAuthorsFromState = (authors) => {
    let cachedAuthors = []

    forEach(authors.result, (id) => (cachedAuthors = concat(cachedAuthors, authors.entities.author[id])))

    return cachedAuthors
}


const mapStateToProps = (state) => ({
    authors: getAuthorsFromState(state.author)
})


let AuthorTable = ({authors}) => (

    <table>
        <tbody>
        {authors.map(author =>
            <AuthorRow
                key={author.id}
                {...author}
            />
        )}
        </tbody>
    </table>
)


AuthorTable.propTypes = {
    authors: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired
}


AuthorTable = connect(
    mapStateToProps
)(AuthorTable)

export default AuthorTable
