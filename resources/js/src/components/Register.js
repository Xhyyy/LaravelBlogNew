import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { makeStyles, TextField, Grid, Button } from '@material-ui/core';
import api from '../api';
import { Box } from '@mui/system';
import { Container } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.pexels.com/photos/4301252/pexels-photo-4301252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")',
    height: '200px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: '4rem',
    marginBottom: 50,
    [theme.breakpoints.down('sm')]: {
      height: 300,
      fontSize: '3em'
    }
  }
}));

const Register = () => {
  const classes = useStyles();
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
    <div>
      <Box className={classes.hero}>
        <Box>Register</Box>
      </Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField 
              value={name}
              variant='outlined'
              placeholder='Name' 
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              value={email}
              variant='outlined'
              type='email'
              placeholder='Email' 
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
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
      </Container>
    </div>
  );

};
export default Register;

if (document.getElementById('register')) {
  ReactDOM.render(<Register />, document.getElementById('register'));
}