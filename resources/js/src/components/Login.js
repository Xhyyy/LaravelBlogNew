import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { TextField, Grid, Button, Paper } from '@material-ui/core';
import api from '../api';
import { Avatar, Container, Link, Typography } from '@mui/material';
import { LockOutlined } from '@material-ui/icons';

const Login = () => {
  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
  const avatarStyle = { backgroundColor: '#3370bd' }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginUser = async (data) => {
    // console.log('---->', data);
    const response = await api.post('/login', data);
    if (response.status == 200 && response.data.code == 200) {
      // console.log('Success', response.data.user);
      console.log(response.data.message);
      window.location.href = '/home-page';
    } else {
      console.log(response.data.message);
    }
  };

  return (
    <div>
      <Container>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
              <Avatar style={avatarStyle}><LockOutlined /></Avatar>
              <Typography variant='h4' style={{ marginBottom: 20 }}>Login</Typography>
            </Grid>

            <TextField
              value={email}
              variant='outlined'
              type='email'
              placeholder='Email'
              style={{ margin: '2px 0' }}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              value={password}
              variant='outlined'
              placeholder='Password'
              type='password'
              style={{ margin: '2px 0' }}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button
              variant='contained'
              color='primary'
              type='submit'
              style={{ margin: '2px 0' }}
              fullWidth
              onClick={() => LoginUser({
                email: email,
                password: password
              })}
            >
              Login
            </Button>
            <Typography textAlign='center'>Dont have an account?
              <Link href="/register-page">
                <span style={{ marginLeft: "4px" }}>Register</span>
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Container>
    </div>
  );

};
export default Login;

if (document.getElementById('login')) {
  ReactDOM.render(<Login />, document.getElementById('login'));
}