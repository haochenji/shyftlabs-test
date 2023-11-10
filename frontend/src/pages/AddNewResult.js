import React, { useState, useContext, useEffect} from "react"; 
import './pages.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material'
import axios from "axios";
import {UserContext} from "../index"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


const AddNewResult = () => {
  const [score, setScore] = useState('');
  const [student, setStudent] = useState('');
  const [course, setCourse] = useState('');

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  

  const url = useContext(UserContext)

  const handleScoreChange = (event) => {
    setScore(event.target.value);
  }

  const handleStudentChange = (event) => {
    setStudent(event.target.value);
  }

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  }

  useEffect(()=>{
    axios
      .get(url+"/api/students/")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));

    axios
      .get(url+"/api/courses/")
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));

  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();
      
    const body = {
      score: score,
      student: student.id,
      course: course.id
    }

    axios
      .post(url+'/api/resultsSet/', body)
      .then(res => NotificationManager.success("New score entered", 'Success'))
      .catch(error => console.error(error));

    setScore('');
    setStudent('');
    setCourse('');
  }

  const unfinished = score === '' || student === '' || course === '' ;

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      autoComplete="off"
    >
      <h1>Add New Result</h1>
      <div>
        <FormControl style={{margin: 10, minWidth: 100}}>
          <InputLabel id="demo-simple-select-label">Student</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={student}
            label="Student"
            onChange={handleStudentChange}
          >
            {students.map(s => 
              <MenuItem key={s.id} value={s}>{s.first_name}</MenuItem>
            )}
          </Select>
        </FormControl>
        
        <FormControl style={{margin: 10, minWidth: 100}}>
          <InputLabel id="demo-simple-select-label">Course</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={course}
            label="Course"
            onChange={handleCourseChange}
          >
            {courses.map(c => 
              <MenuItem key={c.id} value={c}>{c.name}</MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl style={{margin: 10, minWidth: 100}}>
          <InputLabel id="demo-simple-select-label">Score</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={score}
            label="Score"
            onChange={handleScoreChange}
          >
            <MenuItem value={'A'}>A</MenuItem>
            <MenuItem value={'B'}>B</MenuItem>
            <MenuItem value={'C'}>C</MenuItem>
            <MenuItem value={'D'}>D</MenuItem>
            <MenuItem value={'E'}>E</MenuItem>
            <MenuItem value={'F'}>F</MenuItem>
          </Select>
        </FormControl>
      </div>
      
      
      <Button disabled={unfinished} variant="contained" color="primary" onClick={handleSubmit}>
        Add Score
      </Button>
    </Box>
  )
}

export default AddNewResult;