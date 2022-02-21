import * as React from 'react';
import { useEffect } from 'react';
import MaterialTable from '@material-table/core';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from "../../features/users/userSlice";


let updateUser = async (userData) => {
  const res = await axios.patch(`http://localhost:8080/api/users/${userData['_id']}`,
    userData);
  console.log(res);
}
let deleteUser = async (deletedUser) => {
  const res = await axios.delete(`http://localhost:8080/api/users/${deletedUser['_id']}`)
  console.log(res);
}


export default function Datatable() {
  const { users, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch])

  let columns = [];
  for (const property in users[0]) {
    if (property === "firstName" || property === "lastName" || property === "email") {
      columns.push({ title: property.toUpperCase(), field: property })
    }
  }


  return (
    <div style={{ height: 900, width: '100%' }}>
      <MaterialTable title={"Users"} columns={columns} data={users} editable={{
        onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
          updateUser(newRow);
          resolve();
          window.location.reload();

        }), onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
          deleteUser(selectedRow);
          resolve();
          window.location.reload();

        })
      }}


      />
      {/* <DataGrid
        onCellEditCommit={handleCellEditCommit}
        editMode="row"
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
        
       
      /> */}
    </div>
  );
}