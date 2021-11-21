import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { TextField, Box, Grid, Paper, makeStyles,Button,MenuItem } from '@material-ui/core';
import api from '../api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: '100%',
    },
  },
}));

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = async(data) => {
    console.log('asd123 ---->',data);

    const response = await api.post('api/user/registerUser', data);
    if (response.data.code == 200) {
      alert(response.data.message);
    }else {
      alert(response.data.message);
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid container item xs={12}>
        <TextField 
          value={name}
          variant='outlined'
          placeholder='Name' 
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <TextField 
          value={email}
          variant='outlined'
          type='email'
          placeholder='Email' 
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField 
          value={password}
          variant='outlined'
          placeholder='Password' 
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          error={password != confirmPassword? true : false}
          helperText={password != confirmPassword ? 'password dont match' : ''}
            
          fullWidth
        />
        <TextField 
          value={confirmPassword}
          variant='outlined'
          type='password'
          placeholder='Confirm Password' 
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={password != confirmPassword? true : false}
          helperText={password != confirmPassword ? 'password dont match' : ''}
          fullWidth
        />  
        <Button
          variant='contained'
          color='primary'
          onClick={()=> registerUser({
            name: name,
            email: email,
            password: password
          })}
        >
            Register
        </Button>
      
      </Grid>
    </Grid>
  );

};
export default Register;

if (document.getElementById('register')) {
  ReactDOM.render(<Register />, document.getElementById('register'));
}