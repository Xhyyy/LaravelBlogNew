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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginUser = async(data) => {
    console.log('---->',data);
    const response = await api.post('api/user/loginUser', data);
    if (response.data.code == 200) {
      console.log('asdasd',response.data.message);
    }else {
      console.log(response.data.message);
    }
  };


  return (
    <Grid container spacing={1}>
      <Grid container item xs={12}>
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
          fullWidth
        />
        <Button
          variant='contained'
          color='primary'
          type='submit'
          onClick={()=> LoginUser({
            email: email,
            password: password
          })}
        >
            Login
        </Button>
      
      </Grid>
    </Grid>
  );
 
};
export default Login;

if (document.getElementById('login')) {
  ReactDOM.render(<Login />, document.getElementById('login'));
}