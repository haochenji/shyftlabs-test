import React, { useState, useContext} from "react"; 
import './pages.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material'
import validator from 'validator'
import axios from "axios";
import {UserContext} from "../index"
import {NotificationContainer, NotificationManager} from 'react-notifications';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AddNewStudent = () => {
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState(dayjs('2000-01-01'));

  
  const [firstNameError, setFirstNameError] = useState(false);
  const [familyNameError, setFamilyNameError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const url = useContext(UserContext)
  
  const handleFirstNameChange = (event) => {
    setFirstName(event.currentTarget.value);

    if(event.currentTarget.value?.trim() === '')
      setFirstNameError(true)
    else
      setFirstNameError(false)
  }

  const handleFamilyNameChange = (event) => {
    setFamilyName(event.currentTarget.value);

    if(event.currentTarget.value?.trim() === '')
      setFamilyNameError(true)
    else
      setFamilyNameError(false)
  }

  const handleEmailChange = (event) => {
    const _email = event.currentTarget.value;
    setEmail(_email);

    if(!validator.isEmail(_email))
      setEmailError(true)
    else
      setEmailError(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
      
    const body = {
      first_name: firstName,
      family_name: familyName,
      date_of_birth: dateOfBirth.toDate().toISOString().split('T')[0],
      email
    }

    axios
      .post(url+'/api/students/', body)
      .then(res => NotificationManager.success(res.data.first_name+" entered", 'Success'))
      .catch(error => console.error(error));

    setFirstName('');
    setFamilyName('');
    setEmail('');
    setDateOfBirth(dayjs('2000-01-01'));
  }

  const unfinished = firstName?.trim() === '' || familyName?.trim() === '' || !validator.isEmail(email) || dateOfBirthError;

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      autoComplete="off"
    >
      <h1>Add New Student</h1>
      <div>
        <TextField 
          required
          error={firstNameError} 
          value={firstName} 
          onChange={handleFirstNameChange} 
          label="First Name"
          helperText={firstNameError ? "Invalid entry." : ""}/>
        <TextField
          required 
          error={familyNameError} 
          value={familyName} 
          onChange={handleFamilyNameChange} 
          label="Family Name" 
          helperText={familyNameError ? "Invalid entry." : ""}/>
      </div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker 
              label="Date of Birth"
              value={dateOfBirth}
              onChange={setDateOfBirth}
              onError={setDateOfBirthError}
              slotProps={{
                textField: {
                  helperText: (dateOfBirthError ? "Please enter valid date of 10 years at least" : ""),
                },
              }}
              maxDate={dayjs().subtract(10, 'year')}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div>
        <TextField
         required 
         error={emailError} 
         value={email} 
         onChange={handleEmailChange} 
         label="Email"
         helperText={emailError ? "Invalid email." : ""}/>
      </div>
      <Button disabled={unfinished} variant="contained" color="primary" onClick={handleSubmit}>
        Add Student
      </Button>
      <NotificationContainer/>
    </Box>
  )
}

export default AddNewStudent;