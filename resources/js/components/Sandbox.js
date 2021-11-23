import { Typography } from '@mui/material';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { TextField, Box, Grid, Paper, makeStyles,Button,MenuItem } from '@material-ui/core';
import api from '../src/api';
import * as Yup from 'yup';
const textFieldProps = {
  variant: 'outlined',
  size: 'small',
  fullWidth: true,
};

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

const statusList = [
  {value: 'published', label: 'Publish'},
  {value: 'unpublish', label: 'Unpublished'}
];

const Sandbox = () => {
  const classes = useStyles();
  const initialValues = { title: '', content: '',status: 'unpublish' };
  const [editValues,setEditValues] = useState([]);
  const submitHere = (values, formikProps) => {

    console.log('the submit values', values);
    console.log('the submit values', formikProps);
  };
  const editValuesFetch = async() => {
    const dataToSend =  {
      id: 4
    };
    const response = await api.post('api/blog/showBlog', dataToSend);
    if(response.status == 200){
      console.log(response.data.blogData);
      setEditValues(
				response.data.blogData[0]
			);
    }
  };

	useEffect(()=>{
		console.log(editValues);
	},[editValues]);

  const fieldValidation = Yup.object(
    {
      title: Yup.string().max(50, 'Title too long').required('Please Input Valid Title'),
      content: Yup.string().min(200, 'Title too short').required('PLease input valid Content')
    });
  return (
    <div>
      <Typography variant='h1'>Sandbox Page </Typography>
      <Button onClick={()=> editValuesFetch()}> Edit </Button>
      <Formik
        initialValues={editValues ||initialValues}
        onSubmit={(values, formikProps) => submitHere(values, formikProps)}
        validationSchema={fieldValidation}
        enableReinitialize
      >
        {					
          (formikProps) => {
            return (
              <Paper variant='outlined' className={classes.root}>
                <Box m={2}>
                  <Grid container direction='row' spacing={1}>
                    <Form>
                      <Grid item xs>
                        <Field name='title'>
                          {
                            ({ field, meta }) => (
                              <TextField
                                label='title'
                                {...field}
                                {...textFieldProps}
                                error={meta.touched && meta.error ? true : false}
                                helperText={meta.error}
                              />
                            )
                            
                          }
                        </Field>
                      </Grid>
                      <Grid item xs>
                        <Field name='content'>
                          {
                            ({ field, meta }) => (
                              <TextField
                                label='content'
                                {...field}
                                {...textFieldProps}
                                error={meta.touched && meta.error ? true : false}
                                helperText={meta.error}
                              />
                            )
                          }
                        </Field>
                      </Grid>
                      <Grid item xs>
                        <Field name='status'>
                          {
                            ({ field, meta }) => (
                              <TextField
                                select
                                label='status'
                                {...field}
                                {...textFieldProps}
                                error={meta.touched && meta.error ? true : false}
                                helperText={meta.error}
                                fullWidth
                              >
                                {
                                  statusList.map((list,idx)=> (
                                    <MenuItem key = {`${list}-${idx}`} value={list.value}>
                                      {list.label}
                                    </MenuItem>
                                  )
                                  )
                                }
                              </TextField>
                            )
													
                          }
                        </Field>
                      </Grid>
                      <Button type='submit' disabled= {!formikProps.isValid}>Submit</Button>
                    </Form>
                  </Grid>
                </Box>
              </Paper>
            );
          }
        }
      </Formik>
    </div>
  );

};
export default Sandbox;

if (document.getElementById('sandbox')) { 
  ReactDOM.render(<Sandbox />, document.getElementById('sandbox'));
}