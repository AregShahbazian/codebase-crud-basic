import React from 'react'
import {Field, reduxForm} from 'redux-form'

let AuthorFilter = () => {

    return (
        <div>
            <form>

                <Field name="nameFilter" component="input" type="text" placeholder="Name"/>
                <Field name="numberOfBooksFilter" component="input" type="number" placeholder="Number of books"/>
            </form>
        </div>
    )
}

AuthorFilter = reduxForm({
    form: 'filterForm'
})(AuthorFilter)


export default AuthorFilter
