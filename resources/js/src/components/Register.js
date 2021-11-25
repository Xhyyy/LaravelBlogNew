import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { TextField, Grid, Button, Paper } from '@material-ui/core';
import api from '../api';
import { Avatar, Container, Link, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';

const Register = () => {
  const paperStyle={padding:20, height:'70vh', width:280, margin:"20px auto"}
  const avatarStyle={backgroundColor:'#3370bd'}
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = async (data) => {
    console.log('data values ---->', data);

    const response = await api.post('api/user/registerUser', data);
    if (response.data.code == 200) {
      alert(response.data.message);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div>
      <Container>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
              <Avatar style={avatarStyle}><LockOutlined /></Avatar>
              <Typography variant='h4' style={{marginBottom:20}}>Register</Typography>
            </Grid>

            <TextField
              value={name}
              variant='outlined'
              placeholder='Name'
              style={{margin:'2px 0'}}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              
            />
            <TextField
              value={email}
              variant='outlined'
              type='email'
              placeholder='Email'
              style={{margin:'2px 0'}}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              value={password}
              variant='outlined'
              placeholder='Password'
              type='password'
              style={{margin:'2px 0'}}
              onChange={(e) => setPassword(e.target.value)}
              error={password != confirmPassword ? true : false}
              helperText={password != confirmPassword ? 'password dont match' : ''}

              fullWidth
            />
            <TextField
              value={confirmPassword}
              variant='outlined'
              type='password'
              placeholder='Confirm Password'
              style={{margin:'2px 0'}}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={password != confirmPassword ? true : false}
              helperText={password != confirmPassword ? 'password dont match' : ''}
              fullWidth
            />

            <Button
              variant='contained'
              color='primary'
              style={{margin:'8px 0'}}
              fullWidth
              onClick={() => registerUser({
                name: name,
                email: email,
                password: password
              })}
            >
              Register
            </Button>
            <Typography textalign='center'>Click Here to
              <Link href="/login-page">
                <span style={{marginLeft:"4px"}}>Login</span> 
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Container>
    </div>
  );

};
export default Register;

if (document.getElementById('register')) {
  ReactDOM.render(<Register />, document.getElementById('register'));
}