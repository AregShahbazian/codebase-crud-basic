import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import routines from "../actions/domain";
import {bindActionCreators} from 'redux'

const mapDispatchToProps = (dispatch) => ({
    onEditClick: bindActionCreators(routines.AUTHOR.FORM.edit, dispatch)
})

let AuthorRow = ({onEditClick, id, name, dateOfBirth}) => (
    <tr>
        <td>
            {name}
        </td>
        <td>
            {dateOfBirth}
        </td>
        <td>
            <button onClick={() => onEditClick({id: id})}>
                Edit
            </button>
        </td>
    </tr>
)

AuthorRow.propTypes = {
    name: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
}

AuthorRow = connect(
    null,
    mapDispatchToProps
)(AuthorRow)

export default AuthorRow

