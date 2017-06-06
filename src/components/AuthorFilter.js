import React from 'react'
import {connect} from 'react-redux'
import {findAuthor} from '../actions'

const mapDispatchToProps = ({
    onSearchClick: findAuthor
})

let AuthorFilter = ({onSearchClick}) => {
    let nameInput

    return (
        <div>
            <form>
                <input
                    placeholder="name"
                    ref={node => {
                        nameInput = node
                    }}
                    onChange={e => onSearchClick(nameInput.value)}/>
            </form>
        </div>
    )
}

AuthorFilter = connect(null, mapDispatchToProps)(AuthorFilter)

export default AuthorFilter
