import React,{ useState } from 'react';
import api from '../api';
import { Grid, TextareaAutosize, TextField, Button } from '@material-ui/core';
// import { IconButton, Close } from '@material-ui/icons';


const Add = (props) => {
  // const [id, setId] = useState();
  const {handleClose} = props;
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
    
  const addBlog = async(data) => {
    const dataToSend = {            
      title: data.title,
      content: data.content
    };
        
    const response = await api.post('api/blog/addOrUpdate', dataToSend);
    if (response.data.code == 200) {
      handleClose();
      alert(response.data.message);
    }else {
      alert('ERROR!');
    }
  };
    
  return (  
    <Grid container spacing={1}>
      <Grid container item xs={12}>
        <TextField 
          value={title}
          size='small' 
          variant='outlined' 
          placeholder='Blog Title' 
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid container item xs={12}>
        <TextareaAutosize 
          value={content}
          minRows={7}
          maxRows={12}
          placeholder='Type Content Here...' 
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '100%' }}
        />
      </Grid>
      <Grid container item xs={12}>
        <Button 
          variant='contained' 
          color='primary' 
          onClick={()=> addBlog({title: title,content: content})}
        >
                    Publish Blog
        </Button>
      </Grid>
    </Grid>
  );
};

export default Add;