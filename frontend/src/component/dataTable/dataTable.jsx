import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class CommonTable extends Component {
  renderButton(params, onDelete) {
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => onDelete(params.data._id)}
        style={{ cursor: "pointer" }}
      />
    );
  }

  renderEditButton(params, onEdit) {
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => onEdit(params.data)}
        style={{ cursor: "pointer" }}
      />
    );
  }

  render() {
    const {
      title,
      loading,
      columnDefs,
      rowData,
      onAdd,
      onEdit,
      onDelete,
      paginationPageSize = 10
    } = this.props;

    // Adding custom buttons to columns
    const customColumnDefs = [
      ...columnDefs,
      {
        headerName: "",
        field: "edit",
        width: 30,
        cellRendererFramework: (params) => this.renderEditButton(params, onEdit)
      },
      {
        headerName: "",
        field: "delete",
        width: 30,
        cellRendererFramework: (params) => this.renderButton(params, onDelete)
      }
    ];

    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">{title}</h2>

        <Button
          variant="primary"
          id="add-button"
          onClick={onAdd}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Add
        </Button>

        <div id="clear-both" />

        {!loading ? (
          <div
            id="table-div"
            className="ag-theme-balham"
            style={{ height: "500px", width: "100%" }}
          >
            <AgGridReact
              columnDefs={customColumnDefs}
              defaultColDef={{ resizable: true, width: 400, filter: "agTextColumnFilter" }}
              rowData={rowData}
              pagination={true}
              paginationPageSize={paginationPageSize}
              getRowHeight={() => 35}
            />
          </div>
        ) : (
          <div id="loading-bar">
            <RingLoader css={override} size={50} color={"#0000ff"} loading={true} />
          </div>
        )}
      </div>
    );
  }
}

export default CommonTable;
