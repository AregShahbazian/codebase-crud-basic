import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import routines from "../actions/domain";
import AuthorRow from "../components/AuthorRow"

const mapDispatchToProps = (dispatch) => ({
    prepareForm: bindActionCreators(routines.AUTHOR.FORM.prepare, dispatch)
})

class AuthorRowContainer extends React.Component {
    onEditClick = () => {
        this.props.prepareForm(this.props.author)
    }

    render() {
        return <AuthorRow author={this.props.author} onEditClick={this.onEditClick}/>
    }
}

AuthorRowContainer = connect(
    null,
    mapDispatchToProps
)(AuthorRowContainer)

export default AuthorRowContainer
