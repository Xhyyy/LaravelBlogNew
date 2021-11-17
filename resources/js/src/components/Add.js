import { Grid, TextareaAutosize, TextField,Button } from '@material-ui/core';

import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import api from '../api';

const Add = () => {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    
    const display = (data) => {
        
        api.post('api/blog/addOrUpdate', data)
        .then ((response)=>{
            if (response.data.code == 200) {
                alert(response.data.message);
            }else {
                alert('ERROR!');
            }
        })
    }
    return (  

        <Grid
            container
            spacing={1}
        >
            <Grid container item xs={12}>
                <TextField 
                    value={title} 
                    variant='outlined' 
                    placeholder='Blog Title' 
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Grid>
            <Grid container item xs={12}>
                <TextareaAutosize 
                    value={content}
                    minRows={7} 
                    placeholder='Type Content Here...' 
                    onChange={(e) => setContent(e.target.value)}
                />
            </Grid>
            <Grid container item xs={12}>
                <Button 
                    variant='contained' 
                    color='primary' 
                    onClick={()=> display({title: title,content: content})}
                >
                    Publish Blog
                </Button>
            </Grid>
        </Grid>
    );
}

export default Add;

if (document.getElementById('add')) {
    ReactDOM.render(<Add />, document.getElementById('add'));
}
