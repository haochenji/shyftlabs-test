import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage"
import AddNewStudent from "./pages/AddNewStudent"
import StudentList from "./pages/StudentList"
import AddNewCourse from "./pages/AddNewCourse"
import CourseList from "./pages/CourseList"
import AddNewResult from "./pages/AddNewResult"
import ResultList from "./pages/ResultList"

import {NotificationContainer, NotificationManager} from 'react-notifications';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function App() {
  const navigate = useNavigate();

  function handleClick(route) {
    navigate(route);
  }

  return (
    <div className="App">
      <div>
        <Box sx={{ width: 200, bgcolor: 'background.paper' }}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem>
                <ListItemButton onClick={()=>handleClick('/')}>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={()=>handleClick('/add-student')}>
                  <ListItemText primary="Add New Student" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={()=>handleClick('/student-list')}>
                  <ListItemText primary="Students List" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={()=>handleClick('/add-course')}>
                  <ListItemText primary="Add New Courses" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={()=>handleClick('/course-list')}>
                  <ListItemText primary="Courses List" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={()=>handleClick('/add-result')}>
                  <ListItemText primary="Add New Results" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={()=>handleClick('/result-list')}>
                  <ListItemText primary="Results List" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </div>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/add-student" element={<AddNewStudent/>} />
        <Route path="/student-list" element={<StudentList/>} />
        <Route path="/add-course" element={<AddNewCourse/>} />
        <Route path="/course-list" element={<CourseList/>} />
        <Route path="/add-result" element={<AddNewResult/>} />
        <Route path="/result-list" element={<ResultList/>} />
      </Routes>
      <NotificationContainer/>
    </div>
  );
}

export default App;
