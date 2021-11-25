import { Typography } from '@material-ui/core';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { TextField, Box, Grid, Paper, makeStyles,Button,MenuItem } from '@material-ui/core';
import * as Yup from 'yup';

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

const MainPage = () => {

 
  
  return (
    <div>
      <Typography variant='h1'>MainPage Page</Typography>
      
    </div>
  );

};
export default MainPage;

if (document.getElementById('mainPage')) {
  ReactDOM.render(<MainPage />, document.getElementById('mainPage'));
}