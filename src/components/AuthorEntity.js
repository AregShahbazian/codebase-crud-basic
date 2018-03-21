import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import routines from "../actions/domain";
import {bindActionCreators} from 'redux'

const mapDispatchToProps = (dispatch) => ({
    prepareForm: bindActionCreators(routines.AUTHOR.FORM.prepare, dispatch)
})

let AuthorRow = ({id, name, dateOfBirth, prepareForm}) => (
    <tr>
        <td>
            {name}
        </td>
        <td>
            {dateOfBirth}
        </td>
        <td>
            <button onClick={() => prepareForm({id, name, dateOfBirth})}>
                Edit
            </button>
        </td>
    </tr>
)

AuthorRow.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    prepareForm: PropTypes.func.isRequired
}

AuthorRow = connect(
    null,
    mapDispatchToProps
)(AuthorRow)

export default AuthorRow

