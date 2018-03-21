import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import routines from "../actions/domain";
import {change, Field, reduxForm} from "redux-form";
import {bindActionCreators} from 'redux'

const mapStateToProps = (state) => ({
    author: state.form.author,
    authors: state.author.entities.author,
    workspace: state.author.workspace
})

const mapDispatchToProps = (dispatch) => ({
    createAuthor: bindActionCreators(routines.AUTHOR.CREATE.trigger, dispatch),
    updateAuthor: bindActionCreators(routines.AUTHOR.UPDATE.trigger, dispatch),
    changeFieldValue: (field, value) => {
        dispatch(change('author', field, value))
    }
})

class AuthorEditor extends Component {
    render() {
        const {createAuthor, updateAuthor, workspace, author} = this.props

        return (
            <div>
                <form onSubmit={e => {
                    e.preventDefault()
                    /* By default the  editMode is undefined, so createAuthor will be called*/
                    if (!workspace.editMode) {
                        createAuthor(author.values)
                    } else {
                        updateAuthor(author.values, {id: workspace.id})
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
    }

    componentDidUpdate(prevProps) {
        let {changeFieldValue, authors, workspace} = this.props

        if (workspace !== prevProps.workspace) {
            if (workspace.editMode && workspace.id) {
                changeFieldValue("name", authors[workspace.id].name)
                changeFieldValue("dateOfBirth", authors[workspace.id].dateOfBirth)
            }
        }
    }

}

AuthorEditor.propTypes = {
    author: PropTypes.object,
    authors: PropTypes.object,
    workspace: PropTypes.object,
    createAuthor: PropTypes.func.isRequired,
    updateAuthor: PropTypes.func.isRequired,
    changeFieldValue: PropTypes.func.isRequired
}

AuthorEditor = reduxForm({
    form: 'author',
    fields: ["name", "dateOfBirth"]
})(AuthorEditor)

AuthorEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorEditor)


export default AuthorEditor
