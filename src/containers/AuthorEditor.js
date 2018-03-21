import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import routines from "../actions/domain";
import {Field, reduxForm} from "redux-form";
import {bindActionCreators} from 'redux'

const mapStateToProps = (state) => ({
    authorForm: state.form.author
})

const mapDispatchToProps = (dispatch) => ({
    createAuthor: bindActionCreators(routines.AUTHOR.CREATE.trigger, dispatch),
    updateAuthor: bindActionCreators(routines.AUTHOR.UPDATE.trigger, dispatch)
})

let AuthorEditor = ({createAuthor, updateAuthor, authorForm}) => (
    <div>
        <form onSubmit={e => {
            e.preventDefault()
            /* By default the authorForm.values is undefined, so createAuthor will be called*/
            if (!authorForm.values.id) {
                createAuthor(authorForm.values)
            } else {
                updateAuthor(authorForm.values, {id: authorForm.values.id})
            }
        }}>

            <Field name="name" component="input" type="text" placeholder="name"/>
            <Field name="dateOfBirth" component="input" type="text" placeholder="dateOfBirth"/>

            <button type="submit">
                Save
            </button>
        </form>
    </div>
)

AuthorEditor.propTypes = {
    author: PropTypes.object,
    createAuthor: PropTypes.func.isRequired,
    updateAuthor: PropTypes.func.isRequired
}

AuthorEditor = reduxForm({
    form: 'author',
    fields: ["id", "name", "dateOfBirth"]
})(AuthorEditor)

AuthorEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorEditor)


export default AuthorEditor
