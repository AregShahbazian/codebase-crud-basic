import React from "react";
import PropTypes from "prop-types";
import {concat, forEach} from "lodash";
import {connect} from "react-redux";
import routines from "../actions/domain";
import AuthorRow from "../components/AuthorEntity";
import {bindActionCreators} from 'redux'

const getAuthorsFromState = (authors) => {
    let cachedAuthors = []
    forEach(authors.result, (id) => (cachedAuthors = concat(cachedAuthors, authors.entities.author[id])))
    return cachedAuthors
}

const mapDispatchToProps = (dispatch) => ({
    prepareForm: bindActionCreators(routines.AUTHOR.FORM.prepare, dispatch)
})

const mapStateToProps = (state) => ({
    authors: getAuthorsFromState(state.author)
})


let AuthorTable = ({authors, prepareForm}) => (
    <div>
        <button onClick={() => prepareForm({id: undefined, editMode: false})}>
            Create New
        </button>
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

    </div>
)


AuthorTable.propTypes = {
    authors: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    prepareForm: PropTypes.func.isRequired
}


AuthorTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorTable)

export default AuthorTable
