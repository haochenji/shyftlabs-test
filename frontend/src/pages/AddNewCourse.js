import React, { useState, useContext} from "react"; 
import './pages.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material'
import axios from "axios";
import {UserContext} from "../index"
import {NotificationContainer, NotificationManager} from 'react-notifications';


const AddNewCourse = () => {
  const [courseName, setCourseName] = useState('');
  
  const [courseNameError, setCourseNameError] = useState(false);

  const url = useContext(UserContext)
  
  const handleCourseNameChange = (event) => {
    setCourseName(event.currentTarget.value);

    if(event.currentTarget.value?.trim() === '')
      setCourseNameError(true)
    else
      setCourseNameError(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
      
    const body = {
      name: courseName
    }

    axios
      .post(url+'/api/courses/', body)
      .then(res => NotificationManager.success(res.data.name+" entered", 'Success'))
      .catch(error => console.error(error));

    setCourseName('');
  }

  const unfinished = courseName?.trim() === '';

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      autoComplete="off"
    >
      <h1>Add New Course</h1>
      <div>
        <TextField 
          required
          error={courseNameError} 
          value={courseName} 
          onChange={handleCourseNameChange} 
          label="Course Name"
          helperText={courseNameError ? "Invalid entry." : ""}/>
      </div>
      
      <Button disabled={unfinished} variant="contained" color="primary" onClick={handleSubmit}>
        Add Course
      </Button>
      <NotificationContainer/>
    </Box>
  )
}

export default AddNewCourse;