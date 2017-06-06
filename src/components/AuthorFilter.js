import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {findAuthor} from '../actions'

const mapDispatchToProps = ({
    onSearchClick: findAuthor
})

let AuthorFilter = ({onSearchClick}) => {
    let authorsFilter

    return (
        <div>
            <form>
                <input
                    placeholder="name"
                    ref={node => {
                        authorsFilter = node
                    }}
                    onChange={e => onSearchClick(authorsFilter.value)}
                    autoFocus/>
            </form>
        </div>
    )
}

AuthorFilter.propTypes = {
    onSearchClick: PropTypes.func.isRequired
}

AuthorFilter = connect(null, mapDispatchToProps)(AuthorFilter)

export default AuthorFilter
