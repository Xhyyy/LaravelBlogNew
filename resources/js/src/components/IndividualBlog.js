/* eslint-disable react/prop-types */
import React from 'react';
import api from '../api';
import { Container, Typography, Button } from '@material-ui/core';


const IndividualBlog = (props) => {
  const {blogTitle, handleClose} = props;

  const showBlog = async() => {
    const response = await api.post('api/blog/individualBlog');
    if( response.status == 200 && response.data.code == 200 ) {
        handleClose();
        alert(response.data.message);
    }else {
        alert('ERROR!');
    }
  }

  return (
    <div>
      <Container>
        <Typography>{blogTitle}</Typography>
      </Container>
    </div>
  );
};

export default IndividualBlog;