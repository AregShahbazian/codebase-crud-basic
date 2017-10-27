import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {addAuthor} from '../actions/index'
import {Field, reduxForm} from 'redux-form'

const mapStateToProps = (state) => ({
    editorForm: state.form.editorForm === undefined ? {} : state.form.editorForm.values
})

const mapDispatchToProps = ({
    onAddClick: addAuthor
})

let AuthorEditor = ({onAddClick, editorForm}) => {

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                onAddClick(editorForm.name, editorForm.dateOfBirth, 0)
            }}>

                <Field name="name" component="input" type="text" placeholder="name"/>
                <Field name="dateOfBirth" component="input" type="text" placeholder="dateOfBirth"/>

                <button type="submit">
                    Save
                </button>
            </form>
        </div>
    )
}

AuthorEditor.propTypes = {
    editorForm: PropTypes.object,
    onAddClick: PropTypes.func.isRequired
}

AuthorEditor = reduxForm({
    form: 'editorForm'
})(AuthorEditor)

AuthorEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorEditor)


export default AuthorEditor
