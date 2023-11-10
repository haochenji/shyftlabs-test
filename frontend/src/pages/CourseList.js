import React, { useState, useContext, useEffect} from "react"; 
import {UserContext} from "../index"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";


import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const CourseList = () => {
  const [data, setData] = useState([]);
  
  const url = useContext(UserContext)

  useEffect(()=>{
    axios
      .get(url+"/api/courses/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));

  }, [])

  const deleteCourse = async (id) => {
    axios
      .delete(`${url}/api/courses/${id}/`)
      .then((res) => {
        axios
          .get(url+"/api/courses/")
          .then((res) => setData(res.data))
          .catch((err) => console.log(err));
      });
  }

  return (
    <div style={{ height: 400, width: '100%', marginRight: 20}}>
      <h1>Courses List</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Course Name</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data) => (
              <TableRow
                key={data.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{data.name}</TableCell>
                <TableCell align="left"><IconButton aria-label="delete" onClick={() => deleteCourse(data.id)}><DeleteIcon /></IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default CourseList;