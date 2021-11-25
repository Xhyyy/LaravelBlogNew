/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import api from '../api';
import { Dialog, DialogTitle, DialogContent, Container } from '@material-ui/core';
import { makeStyles, IconButton, Typography, Box, Grid, Card, CardActionArea, CardActions, CardContent } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';
import IndividualBlog from './IndividualBlog';

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.pexels.com/photos/4301252/pexels-photo-4301252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")',
    height: '350px',
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
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  card: {
    maxWidth: '100%',
    marginTop: theme.spacing(3),
    width: '100vw',
  },
  cardActions: {
    display: 'flex',
    margin: '0 10px',
    justifyContent: 'space-between'
  },
  author: {
    display: 'flex'
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  titleRoot: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  contentRoot: {
    padding: theme.spacing(2),
  },
  actionRoot: {
    margin: 0,
    padding: theme.spacing(1),
  }
}));


const Blog = () => {
  const classes = useStyles();
  const [blog, setBlog] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogId, setBlogId] = useState(0);

  const blogPost = async () => {
    const result = await api.post('api/blog/showBlog');
    if (result.status == 200) {
      setBlog(result.data.blogData);
    }
  };

  const handleBlogDialog = (data) => {
    console.log('---->',data.id);
    setBlogTitle(data.title);
    setBlogContent(data.content);
    setBlogId(data.id);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  }

  useEffect(() => {
    blogPost();
  }, [openDialog]);

  return (
    <div>
      <Box className={classes.hero}>
        <Box>Blogs</Box>
      </Box>
      <Container>
        <Grid container spacing={3}>
          {
            blog.length == 0 ? '' :
              blog.map((datas) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={datas.id}>
                    <Card className={classes.card} >
                      {/* <CardActionArea onClick={()=> indiBlog(datas.id)}> */}
                      <CardActionArea 
                        onClick={() => handleBlogDialog(datas.id)}
                      >
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2" color="primary">
                            {datas.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {datas.content}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions className={classes.cardActions}>
                        <Box display='flex' flexDirection='column'>
                          <Box className={classes.author}>
                            <Box>
                              <Typography variant="subtitle2" component="p">
                                Author: {datas.name}
                              </Typography>
                              <Typography variant="subtitle2" color="textSecondary" component="p">
                                Published Date: {datas.publish_date}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </CardActions>
                    </Card>

                    <Dialog onClose={closeDialog} open={openDialog}>
                      <Box>
                        <DialogTitle onClose={closeDialog}>
                          <IconButton onClick={closeDialog}>
                            <HighlightOff />
                          </IconButton>
                          <Box flexGrow={1} />
                            {blogTitle}
                        </DialogTitle>
                      </Box>

                      <DialogContent>
                        <IndividualBlog 
                          blogTitle={blogTitle}
                          blogContent={blogContent}
                          blogId={blogId}
                          handleClose={closeDialog}
                        />
                      </DialogContent>
                    </Dialog>
                  </Grid>

                );
              })
          }
        </Grid>
      </Container>
    </div>
  );
};

export default Blog;

if (document.getElementById('blog')) {
  ReactDOM.render(<Blog />, document.getElementById('blog'));
}