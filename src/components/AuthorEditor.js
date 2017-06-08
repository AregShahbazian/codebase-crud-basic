import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {addAuthor} from '../actions'

const mapDispatchToProps = ({
    onAddClick: addAuthor
})

let AuthorEditor = ({onAddClick}) => {
    let newAuthorName

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                if (!newAuthorName.value.trim()) {
                    return
                }
                onAddClick(newAuthorName.value)
                newAuthorName.value = ''
            }}>
                <input
                    placeholder="name"
                    ref={node => {
                        newAuthorName = node
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
