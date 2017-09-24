import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {findAuthor} from '../actions'
import {Field, reduxForm} from 'redux-form'
import NumberPicker from 'react-widgets/lib/NumberPicker'

const mapDispatchToProps = ({
    onSearchClick: findAuthor
})

let AuthorFilter = ({onSearchClick}) => {
    let nameFilter = ''
    let numberOfBooksFilter = undefined

    let foo = () =>
        <NumberPicker
            max={0}
        />

    return (
        <div>
            <form>
                <Field name="nameFilter" component="input" type="text"/>

                <Field name="numberOfBooksFilter" component="input" type="text"/>

                <input
                    placeholder="nameFilter"
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

AuthorFilter = reduxForm({
    form: 'filterForm'
})(AuthorFilter)

AuthorFilter = connect(
    null,
    mapDispatchToProps
)(AuthorFilter)

export default AuthorFilter
