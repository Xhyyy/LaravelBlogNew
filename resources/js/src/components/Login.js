import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { makeStyles, Box, TextField, Grid, Button } from '@material-ui/core';
import api from '../api';
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

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginUser = async(data) => {
    console.log('---->',data);
    const response = await api.post('api/user/loginUser', data);
    if (response.data.code == 200) {
      console.log(response.data.message);
    }else {
      console.log(response.data.message);
    }
  };

  return (
    <div>
      <Box className={classes.hero}>
        <Box>Login</Box>
      </Box>
      <Container>
        <Grid container spacing={1}>
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
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
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
      </Container>
    </div>
  );
 
};
export default Login;

if (document.getElementById('login')) {
  ReactDOM.render(<Login />, document.getElementById('login'));
}