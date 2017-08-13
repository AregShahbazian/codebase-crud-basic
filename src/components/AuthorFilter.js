import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {findAuthor} from '../actions'

const mapDispatchToProps = ({
    onSearchClick: findAuthor
})

let AuthorFilter = ({onSearchClick}) => {
    let nameFilter = ''
    let numberOfBooksFilter = undefined

    return (
        <div>
            <form>
                <input
                    placeholder="name"
                    type="text"
                    ref={node => {
                        nameFilter = node
                    }}
                    onChange={e => onSearchClick(nameFilter.value, numberOfBooksFilter.value)}
                    autoFocus
                />
                <input
                    placeholder="minimum books"
                    type="number"
                    ref={node => {
                        numberOfBooksFilter = node
                    }}

                    onChange={e => onSearchClick(
                        nameFilter.value,
                        numberOfBooksFilter.value)}
                    autoFocus
                />
            </form>
        </div>
    )
}

AuthorFilter.propTypes = {
    onSearchClick: PropTypes.func.isRequired
}

AuthorFilter = connect(null, mapDispatchToProps)(AuthorFilter)

export default AuthorFilter
