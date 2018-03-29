import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import "react-table/react-table.css";

let AuthorTable = ({entities, handleNewClick, handleUpdateClick, handleDeleteClick, pages, pageSize, loading, refreshTableData}) => (
    <div>
        <button id="create-button" onClick={handleNewClick}>
            Create New
        </button>

        <ReactTable
            columns={[
                {
                    Header: "First Name",
                    accessor: "name"
                },
                {
                    Header: "Age",
                    accessor: "dateOfBirth"
                },
                {
                    id: 'edit',
                    accessor: '[row identifier to be passed to button]',
                    sortable: false,
                    Cell: ({original}) => (
                        <div>
                            <button className="update-button" onClick={() => handleUpdateClick(original)}>
                                Edit
                            </button>
                            <button className="delete-button" onClick={() => handleDeleteClick(original)}>
                                Delete
                            </button>
                        </div>)
                }
            ]}
            manual
            data={entities}
            pages={pages}
            defaultPageSize={10}
            pageSize={pageSize}
            loading={loading}
            onFetchData={refreshTableData}
            className="-striped -highlight"
        />
    </div>
)

AuthorTable.propTypes = {
    entities: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    handleNewClick: PropTypes.func.isRequired,
    handleUpdateClick: PropTypes.func.isRequired,
    handleDeleteClick: PropTypes.func.isRequired,
    pages: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    refreshTableData: PropTypes.func.isRequired
}

export default AuthorTable
