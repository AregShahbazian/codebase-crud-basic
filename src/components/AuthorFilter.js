import React from "react";
import {Field, reduxForm} from "redux-form";

let AuthorFilter = () => {

    return (
        <div>
            <form>
                <Field name="nameFilter" component="input" type="text" placeholder="Name"/>
            </form>
        </div>
    )
}

AuthorFilter = reduxForm({
    form: 'filterForm'
})(AuthorFilter)


export default AuthorFilter
