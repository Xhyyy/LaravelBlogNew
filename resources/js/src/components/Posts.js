//import { Typography } from '@material-ui/core';
import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import api from '../api';


const Posts = () => {
    const [blog,setBlog] = useState([]);
    const blogPost = async() =>{
        const result = await api.post('api/blog/showBlog');
        if(result.status == 200){
            setBlog(result.data.blogData);
            console.log(result.data.blogData);
        }

    };

    useEffect(()=>{
        blogPost();
    },[]);

    return (   
        <Box display='flex'>
            {
                blog.length == 0 ? 
                ''              
                : 
                blog.map((datas)=>{
                    return(
                        <>
                        <Typography key={datas.id}>
                            {datas.title}
                        </Typography>
                        <Typography key={datas.id}>
                            {datas.content}
                        </Typography>
                        </>
                    );
                }) 
            }
        </Box>
    );
}

export default Posts;

if (document.getElementById('posts')) {
    ReactDOM.render(<Posts />, document.getElementById('posts'));
}
