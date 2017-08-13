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
                if (!newAuthorName.value.trim() || !newAuthorDateOfBirth.value.trim()) {
                    return
                }
                onAddClick(newAuthorName.value, newAuthorDateOfBirth.value, 0)
                newAuthorName.value = ''
                newAuthorDateOfBirth.value = ''
            }}>
                <input
                    placeholder="name"
                    type="text"
                    ref={node => {
                        newAuthorName = node
                    }}
                />
                <input
                    placeholder="dateOfBirth"
                    type="text"
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
