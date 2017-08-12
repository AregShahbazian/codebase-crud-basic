import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {addAuthor} from '../actions'

const mapDispatchToProps = ({
    onAddClick: addAuthor
})

let AuthorEditor = ({onAddClick}) => {
    let newAuthorName
    let newAuthorDateOfBirth

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                if (!newAuthorName.value.trim()) {
                    return
                }
                if (!newAuthorDateOfBirth.value.trim()) {
                    return
                }
                onAddClick(newAuthorName.value, newAuthorDateOfBirth.value)
                newAuthorName.value = ''
                newAuthorDateOfBirth.value = ''
            }}>
                <input
                    placeholder="name"
                    ref={node => {
                        newAuthorName = node
                    }}
                />
                <input
                    placeholder="dateOfBirth"
                    ref={node => {
                        newAuthorDateOfBirth = node
                    }}
                />
                <button type="submit">
                    Add Author
                </button>
            </form>
        </div>
    )
}

AuthorEditor.propTypes = {
    onAddClick: PropTypes.func.isRequired
}

AuthorEditor = connect(null, mapDispatchToProps)(AuthorEditor)

export default AuthorEditor
